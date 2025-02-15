// DÙNG TRONG ROUTER
// dung de check xem da lam gi chua , neu ko thi se loi sever , phai yeu nhap it nhat 1 noi dung

module.exports.createPost= (req, res,next) => {
    if ( !req.body.title) {
        req.flash("error","Vui long nhap tieu de");
        res.redirect("back");
        return; // bo qua toan bo cac buoc lan buoc tao data moi
      }
    next(); // đi qua hàm controller
}