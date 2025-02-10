const express = require('express'); // require giống import
var methodOverride = require('method-override') // dùng phương thức PATCH để cập nhật dự liệu 
var bodyParser = require('body-parser') // để dùng req.body


require('dotenv').config(); // import file env
const router = require("./routers/client/index.router") // truy cap vao trang quan ly router cua client ( giu control va click de truy cap den file router do)
const routerAmin = require("./routers/admin/index.router")

const database = require('./config/database') // lấy data từ mongoose
database.connect();

const app = express();
const port = process.env.PORT;


app.use(methodOverride('_method')) // dùng phương thức PATCH để cập nhật dự liệu 
app.use(bodyParser.urlencoded({ extended: false }))//để dùng req.body

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public')); // dùng để chạy được file tĩnh (tên file : public)

//App local varibles
const systemConfig = require("./config/system") // dùng cho file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;


router(app) // goi router JS cua project ra
routerAmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




