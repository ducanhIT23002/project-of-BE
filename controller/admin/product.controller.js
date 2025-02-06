module.exports.ProductDashboard = (req, res) => { 
    res.render("admin/pages/product/index",{
        pageTitle : "Trang product admin"
    }); // render in ra giao diện của pug 
}