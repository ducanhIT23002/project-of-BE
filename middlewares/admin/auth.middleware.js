const systemConfig = require("../../config/system")
const dataAccount = require("../../models/accounts.model")
const role = require("../../models/roles.models")
module.exports.requireAuth = async (req, res, next) => {
 if (!req.cookies.token) {
   res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
 } else {
    const user = await dataAccount.findOne({
        token : req.cookies.token,  
        deleted : false
    }).select("-password")
   if (!user) {
     res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
   } else {
    const roles = await role.findOne({ /// lấy ra quyền của ông đó
        _id : user.role_id,
        deleted : false
    }).select("permissions title")
    // cái này dung
    res.locals.user = user; // đưa tài khoản của ông đăng nhập vào PUG
    res.locals.role = roles; // đưa các quyền của ông đó vào 
    // role.permissions.includes("account_view")  code này trong pug để xem ông đó có quyền này ko
    next();
   }
 }
}