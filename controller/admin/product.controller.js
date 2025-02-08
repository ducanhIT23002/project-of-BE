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

