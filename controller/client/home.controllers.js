const categoryProduct = require("../../models/category.models") // lấy data từ model 
const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => { 
    let find = {
        deleted : false,
        };
    
    const records = await categoryProduct.find(find);
    const newRecords = createTreeHelper.tree(records);
   console.log(newRecords)
    res.render("client/pages/home/index",{
        pageTitle : "Home",
        productData : newRecords,
    }); // render in ra giao diện của pug 
}

//client/pages/home/index