const dataAccount = require("../../models/accounts.model")
var md5 = require('md5');
module.exports.MyAccount = (req, res) => { 
    res.render("admin/pages/myAccount/index",{
        pageTitle : "Trang information"
    }); // render in ra giao diện của pug 
}
module.exports.EditMyAccount = (req, res) => { 
    res.render("admin/pages/myAccount/edit",{
        pageTitle : "Trang edit information"
    }); // render in ra giao diện của pug 
}

module.exports.EditMyAccountPost = async (req, res) => { 
const id = res.locals.user._id
const check = await dataAccount.find({
    _id : {$ne : id},
    email : req.body.email,
    deleted : false
 })
    if (check.length > 0) {
        req.flash("error", "email da ton tai")
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password
        }
        await dataAccount.updateOne( {_id : id} , req.body)
        req.flash("success", "cap nhat thanh cong")
    }
    res.redirect('back')
}
