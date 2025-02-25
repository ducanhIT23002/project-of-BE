 const prod = require("./product.router")
 const home = require("./home.router")
const category = require("../../middlewares/client/category.middleware")
// ham export cua nodejs
module.exports = (app) => {
    app.use(category.category)
    app.use('/',home);
    //router con : http://localhost:3000/product
    app.use('/product', prod); // vi ben kia da dung get thi ben nay se dung use
}