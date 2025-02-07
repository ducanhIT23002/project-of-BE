const dataproduct = require("../../models/product.models") // lấy data từ model 

module.exports.ProductDashboard = async (req, res) => { 
//    console.log(req.query.status); // tìm status được xuất hiện trong req, phải thay đổi url ?status=inactive thì mới xuất hiện  trong console
   let button = [
    { class : "",
        status : "",
      content : "Tất cả"
    },
    { class : "",
        status : "active",
        content : "Hoạt động "
      },
      { class : "",
        status : "inactive",
        content : "Dừng Hoạt động "
      },
   ]
    
   
   let find = {
    deleted : false,
   };

   //req.query tra ra cac gia tri ( thuoc tinh ) tren thanh URL
  

//HAM TIM CHI SO
//    button.findIndex((item, index, array) => {  
//     CODE....
// });
    if (req.query.status ) {
        find.status = req.query.status; 
        const index = button.findIndex(item => item.status == req.query.status); // tim chi so
        button[index].class = "active";
    } else {
        const index = button.findIndex(item => item.status == ""); 
        button[index].class = "active";
    }
    
    let keyword ="";
    if (req.query.keyword) { // xem co van ban nao duoc nhap hay khong 
      keyword = req.query.keyword; // neu co van ban duoc nhap thi trich xuat data theo van ban do ( title)
      const regex = new RegExp(keyword,"i");
      find.title = regex; // dua vao dieu kien de trich xuat data
    } 


  //  console.log(req.query.keyword)
    const productData = await dataproduct.find(find); // lấy all doc ra từ mẫu Product ở trên

    res.render("admin/pages/product/index",{
        pageTitle : "Trang product admin",
        DataOfPro : productData,
        but : button,
        keyword : keyword
    }); // render in ra giao diện của pug 
}