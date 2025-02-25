const dataproduct = require("../../models/product.models") // lấy data từ model 

module.exports.index = async (req, res) => {
    const Product = await dataproduct.find({
        status:"active",
        deleted: false
    }); // lấy all doc ra từ mẫu Product ở trên
    

    Product.forEach(item => {
        item.newPrice = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
    });
    // có thể dùng map và return lại hàm mới


    res.render("client/pages/product/index", {
        pageTitle : "Product",
        Products : Product
    })
}