const multer  = require('multer') // dùng để thêm hình ảnh cho sản phẩm mới



// HÀM DÙNG ĐỂ CÓ THẺ XEM ẢNH ONLINE
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/uploads/') // thư mục lưu
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now();
          cb(null,`${uniqueSuffix}-${file.originalname}`) // tên lưu trông file upload để có đuổi kiểu anh để mở online
        }
      })
      
      return storage;
}