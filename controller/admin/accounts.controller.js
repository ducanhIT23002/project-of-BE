const dataAccount = require("../../models/accounts.model")
const Role = require("../../models/roles.models")
var md5 = require('md5');
const systemConfig = require("../../config/system")
module.exports.index = async (req, res) => { 
    let find = {
        deleted : false
    }
    let data = await dataAccount.find(find);
    for (const item of data) {
        let roles = await Role.findOne({
            _id : item.role_id,
            deleted : false
        });
        item.role = roles;
    }
      res.render("admin/pages/accounts/index",{
          pageTitle : "Danh sách tái khoản",
          acc : data
      }); // render in ra giao diện của pug
  }


  
module.exports.create = async (req, res) => { 
    let find = {
        deleted : false
    }
let data = await Role.find(find);
res.render("admin/pages/accounts/create",{
    pageTitle : "Danh sách tái khoản",
    dataRole : data
}); // render in ra giao diện của pug
}

module.exports.createPost = async (req, res) => { 
let emailExist = await dataAccount.find({
    email : req.body.email,
    deleted : false
});

if (emailExist.length > 0) {
    req.flash("error","cập nhật thất bại");
    res.redirect(`back`) 
} else {
    req.body.password = md5(req.body.password)
    const dataAcc = new dataAccount(req.body)
    await dataAcc.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`) 
}

}

module.exports.edit = async (req, res) => { 
    const id = req.params.id;
    let find = {
        deleted : false
    }
let data = await Role.find(find);
let account = await dataAccount.findOne({
    _id : id,
    deleted : false
});
res.render("admin/pages/accounts/edit",{
    pageTitle : "edit tái khoản",
    dataRole : data,
    dataAcc : account
}); // render in ra giao diện của pug
}

module.exports.EditPost = async (req, res) => { 
    const id = req.params.id;
    let emailExist = await dataAccount.find({ // kiểm tra xem imail có tồn tại hay chưa
        _id : {$ne : id}, // trừ bản thân ra
        email : req.body.email,
        deleted : false
    });
    
    if (emailExist.length > 0) {
        req.flash("error","email đã tồn tại");
        res.redirect(`back`) 
    } else {
        req.body.password = md5(req.body.password)
        await dataAccount.updateOne ({
            _id : id
          },req.body)
        res.redirect(`${systemConfig.prefixAdmin}/accounts`) 
    }
    
    }