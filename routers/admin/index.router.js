const admin  = require('./dashboard.router')
const ProAdmin = require('./product.router')
const categoryProduct = require('./product-category.router')
const rolePermission = require('./roles.router')
const Account = require('./accounts.router')
const auth = require('./auth.router')
const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', admin);
    app.use(PATH_ADMIN + '/product', ProAdmin);
    app.use(PATH_ADMIN + '/product-category', categoryProduct);
    app.use(PATH_ADMIN + '/roles', rolePermission);
    app.use(PATH_ADMIN + '/accounts', Account);
    app.use(PATH_ADMIN + '/auth', auth);
}


