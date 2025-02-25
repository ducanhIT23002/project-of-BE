const admin  = require('./dashboard.router')
const ProAdmin = require('./product.router')
const categoryProduct = require('./product-category.router')
const rolePermission = require('./roles.router')
const Account = require('./accounts.router')
const auth = require('./auth.router')
const checkauth = require('../../middlewares/admin/auth.middleware')
const MyAccount = require("./MyAccount.router")
const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(
        PATH_ADMIN + '/dashboard',
        checkauth.requireAuth,
         admin
        );
    app.use(PATH_ADMIN + '/product',checkauth.requireAuth, ProAdmin);
    app.use(PATH_ADMIN + '/product-category',checkauth.requireAuth, categoryProduct);
    app.use(PATH_ADMIN + '/roles',checkauth.requireAuth, rolePermission);
    app.use(PATH_ADMIN + '/accounts',checkauth.requireAuth, Account);
    app.use(PATH_ADMIN + '/my-account',checkauth.requireAuth, MyAccount);
    app.use(PATH_ADMIN + '/auth', auth);
}


