
const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router

const multer  = require('multer') // dùng để thêm hình ảnh cho sản phẩm mới
const storageMulter = require("../../helpers/storageMulter") // // HÀM DÙNG ĐỂ CÓ THẺ XEM ẢNH ONLINE
const upload = multer({ storage: storageMulter() }) // thư mục chứa hình ảnh đăng tải lên giao diện ( đứng từ trường cao nhất)
// tạo ra một middleware upload sử dụng thư viện multer để xử lý việc tải lên tệp tin (ở đây là hình ảnh). Cụ thể, multer được cấu hình với một storage (vị trí lưu trữ tệp tin) mà bạn đã định nghĩa trong hàm storageMulter
//dest là đường dẫn thư mục lưu ảnh / và cũng là nới để localhost truy cập vào để lấy in ra giao diện

const controller = require("../../controller/admin/product.controller")


router.get('/', controller.ProductDashboard);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.delete);

// đường dẫn sang trang tạo sản phẩm : GET vì trong file PUG dùng thẻ a 
router.get('/create', controller.create);
// dùng patch để đưa submit form của trang tạo sản phẩm
router.patch('/create', upload.single('thumbnail'), controller.createPost); // thay đổi thành trường lưu ảnh trên database upload.single('thumbnail')



module.exports = router; 