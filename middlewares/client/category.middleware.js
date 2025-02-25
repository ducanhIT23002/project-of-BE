const categoryProduct = require("../../models/category.models") // lấy data từ model 
const createTreeHelper = require("../../helpers/createTree");
module.exports.category = async (req,res,next) => {
    let find = {
        deleted : false,
        };
    
    const records = await categoryProduct.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.locals.productData = newRecords
    next();   
}