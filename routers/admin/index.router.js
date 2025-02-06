const admin  = require('./dashboard.router')
const ProAdmin = require('./product.router')

const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', admin);
    app.use(PATH_ADMIN + '/product', ProAdmin);
}