const express = require('express'); // require giống import
const path = require('path');// tinyMCE
var methodOverride = require('method-override') //dùng phương thức PATCH/DELETE/.. để cập nhật dự liệu 

var bodyParser = require('body-parser') // để dùng req.body

var flash = require('express-flash')// dùng để cài đặt hiển thị thông báo
const cookieParser = require('cookie-parser'); //dùng để cài đặt hiển thị thông báo ( alert)
const session = require('express-session'); //dùng để cài đặt hiển thị thông báo ( alert)

// const multer  = require('multer'); // 

require('dotenv').config(); // import file env
const router = require("./routers/client/index.router") // truy cap vao trang quan ly router cua client ( giu control va click de truy cap den file router do)
const routerAmin = require("./routers/admin/index.router")

const database = require('./config/database') // lấy data từ mongoose
database.connect();

const app = express();
const port = process.env.PORT;


app.use(methodOverride('_method')) // dùng phương thức PATCH/DELETE/.. để cập nhật dự liệu 
app.use(bodyParser.urlencoded({ extended: false }))//để dùng req.body

//dùng để cài đặt hiển thị thông báo
app.use(cookieParser('DUCANH')); // key này tự tạo ra   | phải cài thư viện cookieParser
app.use(session({ secret: 'DUCANH', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));      //|phải cài thư viện session
app.use(flash()); // lưu vào cookie


// DÙNG DIRNAME ĐỂ UNLOAD LÊN ĐƯỢC VERCEL , SỬA TRONG CODE CỦA VIEW VÀ PUBLIC 
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug'); 
app.use(express.static(`${__dirname}/public`)); // dùng để chạy được file tĩnh (tên file : public)

// tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


//App local varibles
const systemConfig = require("./config/system") // dùng cho file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;


router(app) // goi router JS cua project ra
routerAmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




