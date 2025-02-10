const dataproduct = require("../../models/product.models") // lấy data từ model 
const statusFilter = require("../../helpers/filterStatus")
const search = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

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
    const productData = await dataproduct.find(find).limit(pagination.LimitElement).skip(pagination.skip); // lấy all doc ra từ mẫu Product ở trên
                                                    // trích xuất giới hạn 4 element và bỏ qua #{pagination.skip} phần tử đầu 
    res.render("admin/pages/product/index",{
        pageTitle : "Trang product admin",
        DataOfPro : productData,
        but : StateFil,
        keyword : searchKeyword.keyword,
        pagination: pagination
    }); // render in ra giao diện của pug 
}

module.exports.changeStatus = async (req, res) => { 
 console.log(req.params);
 const id = req.params.id; // thì router có tham số động ( dấu : phía trước , nên :status thì dùng được req.params.status)
 const status = req.params.status;

 // cập nhật ID và status mới cho database 
await dataproduct.updateOne({ _id : id }, { status: status });

// sau khi cập nhật quay trở lại trang web như hiện tại
res.redirect("back");
}
module.exports.changeMulti = async (req, res) => { 
  console.log(req.body);
  const type = req.body.type ;// lấy giá trị từ form group select sau khi submit form
  const ids = req.body.input.split(", "); // chuyển string thành mảng  | lấy giá trị từ form group input
  switch (type) {
    case 'active':
      await dataproduct.updateMany({_id: {$in: ids}} , {status: "active"}); // cập nhật mongoose
      break;
    case 'inactive':
      await dataproduct.updateMany({_id: {$in: ids}} , {status: "inactive"});
      break;
    default:
      break;  
  }
  res.redirect("back");
 }