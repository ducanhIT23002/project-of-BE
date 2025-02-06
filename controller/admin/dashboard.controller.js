module.exports.dashboard = (req, res) => { 
    res.render("admin/pages/dashboard/index",{
        pageTitle : "Trang admin"
    }); // render in ra giao diện của pug 
}