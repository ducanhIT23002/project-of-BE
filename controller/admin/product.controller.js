const dataproduct = require("../../models/product.models") // lấy data từ model 
const statusFilter = require("../../helpers/filterStatus")
const search = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

const systemConfig = require("../../config/system")


module.exports.ProductDashboard = async (req, res) => { 

let find = {
  deleted : false,
 };

// Bộ lộc tìm kiếm
const StateFil = statusFilter(req.query)
if (req.query.status ) {
  find.status = req.query.status; 
}

//Search
const searchKeyword = search(req.query)
if (req.query.keyword ) {
  find.title = searchKeyword.title; 
}

//pagination
const total =  await dataproduct.countDocuments(find); // đếm phần tử của database
let pagination = paginationHelper( 
  {
  CurrentPage : 1,
  LimitElement : 4,
  },
  req.query,
  total
)



let key ;
let type;
if (req.query.key && req.query.type) {
  key = req.query.key
  type = req.query.type
} else {
  key = "position"
  type = "desc"
}
    const productData = await dataproduct.find(find).sort({[key]: type}).limit(pagination.LimitElement).skip(pagination.skip); 
    res.render("admin/pages/product/index",{
        pageTitle : "Trang product admin",
        DataOfPro : productData,
        but : StateFil,
        keyword : searchKeyword.keyword,
        pagination: pagination
    }); // render in ra giao diện của pug 
}

module.exports.changeStatus = async (req, res) => { // lấy action từ Form -> JS của FE để cập nhật dữ liệu lên lại action của form(URL) -> file này dể cạp nhật dữ liệu database
//req.params. id và status là được tại ra từ router, mình viết file router như nào thì req.params.sẽ lấy như thế
 const id = req.params.id; // thì router có tham số động ( dấu : phía trước , nên :status thì dùng được req.params.status)
 const status = req.params.status;

 // cập nhật ID và status mới cho database 
await dataproduct.updateOne({ _id : id }, { status: status });

// câu code của BE để đưa lên thông báo 
req.flash('success', 'Cập nhật trạng thái sản phẩm thành công'); 

// sau khi cập nhật quay trở lại trang web như hiện tại
res.redirect("back"); // sau khi nhận submit của form và đưa đến action, dùng lệnh này để về lại trang hiện tại
}


module.exports.changeMulti = async (req, res) => { 
 // này là lấy action nhưng không thông qua URL giá trị của form là các thuộc name của form
  const type = req.body.type ;// lấy giá trị từ form group select sau khi submit form
  const ids = req.body.input.split(", "); // chuyển string thành mảng  | lấy giá trị từ form group input
  //type và input là 2 giá trị của thuộc name của form , sau khi submit thì req.body nhận được 2 giá trị này

  switch (type) {
    case 'active':
      await dataproduct.updateMany({_id: {$in: ids}} , {status: "active"}); // cập nhật mongoose
      req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
      break;
    case 'inactive':
      await dataproduct.updateMany({_id: {$in: ids}} , {status: "inactive"});
      req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
      break;
    case 'delete-all':
      await dataproduct.updateMany({ _id : {$in: ids} }, { deleted: true, deleteAt: new Date()});
      req.flash('success', `xóa ${ids.length} sản phẩm thành công`);
      break;
    case 'change-position':
      for ( const item of ids) {// vì position có nhìu giá trị nên phải lặp qua từng phần tử 
       let [id, position] = item.split("-"); // vì bên FE có lưu cả id và position bằng dấu -
       position  = parseInt(position ); // chuyển sang số nguyên
       await dataproduct.updateMany({ _id: id} , { 
       position : position
       });
      }
      req.flash('success', `thay đổi vị trí ${ids.length} sản phẩm thành công`);
      break;
    default:
      break;  
  }
  res.redirect("back"); // trở lại trang hiện tại
 }


//NÚT DELETE
module.exports.delete = async (req, res) => { 
  const id = req.params.id;
  await dataproduct.updateOne({ _id : id }, { deleted: true, deleteAt: new Date()});
  res.redirect("back");
}

//TRANG TAO SAN PHAM MOI
module.exports.create = async (req, res) => { 
  res.render("admin/pages/product/create",{
    pageTitle : "tạo sản phẩm mới"
}); // render in ra giao diện của pug 
}

module.exports.createPost = async (req, res) => { 
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock =  parseInt(req.body.stock)
    if (req.body.position == "") {
      const countProducts = await dataproduct.countDocuments();
      req.body.position = countProducts + 1;
      
    } else {
      req.body.position =  parseInt(req.body.position)
    }

    // console.log(req.file) //req.file chứa thông tin về tệp đơn lẻ mà người dùng đã tải lên (nếu bạn sử dụng upload.single('thumbnail')), hoặc nếu bạn sử dụng upload.array('thumbnail'), req.files sẽ chứa một mảng các tệp.
    // 'thumbnail' là tên của trường input trong form PUG. div(class="form-group")
    // label(for="thumbnail") Ảnh
    // input(
    //     type="file"
    //     class="form-control-file"
    //     id="thumbnail"
    //                                     upload.single('thumbnail')    nó đây -->                name="thumbnail"
    //     accept ="image/*"
    // )
    
    // req.body.thumbnail = `/uploads/${req.file.filename}` // cập nhật thumbnail mới cho sản phẩm mới, thế này mới xuất hiện được ảnh trên giao diện
    const product = new dataproduct(req.body); // cập nhập sản phẩm mới vào database
    await product.save(); // và lưu nó
    res.redirect(`${systemConfig.prefixAdmin}/product`) 
}



// Sửa
module.exports.edit = async (req, res) => { 
  const id = req.params.id; 
  let find = {
    deleted : false,
    _id : id
   };
   const productData = await dataproduct.findOne(find) // vì là mục sửa thông tin 1 sản phẩm nên dùng findone
  res.render("admin/pages/product/edit",{
    pageTitle : "sửa sản phẩm",
    product : productData,
});
}

module.exports.editPost = async (req, res) => { 
  const id = req.params.id;
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock =  parseInt(req.body.stock)
  req.body.position =  parseInt(req.body.position)
   // hình ảnh 
  //  if ( req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`
  //  }
   // bắt error nếu cập nhật sản phẩm bị lỗi
   try {
    await dataproduct.updateOne ({
      _id : id
    },req.body) // tra theo id và cập nhật dữ liểu theo req.body
    req.flash("success","chỉnh sửa dữ liệu thành công");
   } catch (error) {
    req.flash("error","cập nhật thất bại");
   }
  res.redirect(`${systemConfig.prefixAdmin}/product`) 
}


// detail
module.exports.detail = async (req, res) => { 
  const id = req.params.id; 
  let find = {
    deleted : false,
    _id : id
   };
   const productData = await dataproduct.findOne(find) // vì là mục sửa thông tin 1 sản phẩm nên dùng findone
   console.log(productData)
  res.render("admin/pages/product/detail",{
    pageTitle : "chi tiết sản phẩm",
    product : productData,
});
}


