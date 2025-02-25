var md5 = require('md5');
const systemConfig = require("../../config/system")
const dataAccount = require("../../models/accounts.model")
module.exports.login = (req, res) => { 
    if (req.cookies.token) { // đang ở trang dashboard mà cố tình vado trang login thì trở lại dashboard 
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    } else {
        res.render("admin/pages/auth/login",{
            pageTitle : "Trang đăng nhập"
        }); // render in ra giao diện của pug 
    }
}

module.exports.loginPost = async (req, res) => { 
let email = req.body.email
let password = req.body.password
const user = await dataAccount.findOne({ // tìm trong data xem email đã tồn tại chưa
    email: email,
    deleted: false
});

if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
}
if (md5(password) != user.password) {
    req.flash("error", "sai mật khẩu!");
    res.redirect("back");
    return;
}

if (user.status == "inactive") {
    req.flash("error", "bị khóa rồi!");
    res.redirect("back");
    return;
}
res.cookie("token",user.token)
res.redirect(`${systemConfig.prefixAdmin}/dashboard`) 
}