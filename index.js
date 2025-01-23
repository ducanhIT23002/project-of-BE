const express = require('express'); // require giống import
const router = require("./routers/client/index.router") // truy cap vao trang quan ly router cua project ( giu control va click de truy cap den file router do)
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public')); // dùng để chạy được file tĩnh (tên file : public)

router(app) // goi router JS cua project ra

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})