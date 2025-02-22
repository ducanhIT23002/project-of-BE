const Role = require("../../models/roles.models") // lấy data từ model 

module.exports.rolePer = async (req, res) => { 
      res.render("admin/pages/roles/index",{
          pageTitle : "roles",
      }); // render in ra giao diện của pug
  }
module.exports.Permission = async (req, res) => { 
    let find = {
        deleted : false,
    }
    const Roledata = await Role.find(find)
    console.log(Roledata)
    res.render("admin/pages/roles/permission",{
        pageTitle : "roles",
        dataRole : Roledata
    }); // render in ra giao diện của pug
}

module.exports.PatchPermission = async (req, res) => { 
 const dataPermission = JSON.parse(req.body.permissions);
 for ( const item of dataPermission) {
    await Role.updateOne({_id: item.id},{permissions : item.permissions})
 }
 req.flash("success","chỉnh sửa dữ liệu thành công");
 res.redirect(`back`) //${systemConfig.prefixAdmin}/product
}