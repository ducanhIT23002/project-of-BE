const categoryProduct = require("../../models/category.models") // lấy data từ model 
const createTreeHelper = require("../../helpers/createTree");
const systemConfig = require("../../config/system")
const paginationHelper = require("../../helpers/pagination")

module.exports.category = async (req, res) => { 
let find = {
    deleted : false,
    };

    const total =  await categoryProduct.countDocuments(find); // đếm phần tử của database
let pagination = paginationHelper( 
  {
  CurrentPage : 1,
  LimitElement : 4,
  },
  req.query,
  total
)
    const DataCategory = await categoryProduct.find(find).limit(pagination.LimitElement).skip(pagination.skip); 
    res.render("admin/pages/product-category/index",{
        pageTitle : "Trang danh sách sản phẩm",
        DataCategory : DataCategory,
        pagination: pagination
    }); // render in ra giao diện của pug 
}


module.exports.create = async (req, res) => { 
  let find = {
    deleted : false,
    };

const records = await categoryProduct.find(find);
const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/product-category/create",{
        pageTitle : "tạo sản phẩm mới",
        DataCategory : newRecords,
    }); // render in ra giao diện của pug
}
  
module.exports.createPost = async (req, res) => { 
    console.log(req.body);
      req.body.price = parseInt(req.body.price)
      req.body.discountPercentage = parseInt(req.body.discountPercentage)
      req.body.stock =  parseInt(req.body.stock)
      if (req.body.position == "") {
        const countProducts = await categoryProduct.countDocuments();
        req.body.position = countProducts + 1;
        
      } else {
        req.body.position =  parseInt(req.body.position)
      }
  
      const product = new categoryProduct(req.body); // cập nhập sản phẩm mới vào database
      await product.save(); // và lưu nó
      res.redirect(`${systemConfig.prefixAdmin}/product-category`) 
  }

module.exports.edit = async (req, res) => { 
    const id = req.params.id; 
    let find = {
      deleted : false,
      _id : id
     };
     let find2 = {
      deleted : false,
     };
     const productData = await categoryProduct.findOne(find)

     const productData2 = await categoryProduct.find(find2) // vì là mục sửa thông tin 1 sản phẩm nên dùng findone
     const newRecords = createTreeHelper.tree(productData2);
     console.log(newRecords)
    res.render("admin/pages/product-category/edit",{
      pageTitle : "sửa sản phẩm",
      product : productData,
      productCate : newRecords
  });
  }
    
  module.exports.editPost = async (req, res) => { 
        req.body.price = parseInt(req.body.price)
        req.body.discountPercentage = parseInt(req.body.discountPercentage)
        req.body.stock =  parseInt(req.body.stock)
        req.body.position =  parseInt(req.body.position)
        const id = req.params.id; 
        try {
          await categoryProduct.updateOne ({
            _id : id
          },req.body) // tra theo id và cập nhật dữ liểu theo req.body
          req.flash("success","chỉnh sửa dữ liệu thành công");
         } catch (error) {
          req.flash("error","cập nhật thất bại");
         }
        res.redirect(`${systemConfig.prefixAdmin}/product-category`) 
    }

