module.exports.createPost= (req, res,next) => {
    if (!req.body.fullName) {
        req.flash("error","Vui long nhap fullName");
        res.redirect("back");
        return; // bo qua toan bo cac buoc lan buoc tao data moi
      }
      if (!req.body.email) {
        req.flash("error","Vui long nhap email");
        res.redirect("back");
        return; // bo qua toan bo cac buoc lan buoc tao data moi
      }
      if (!req.body.password) {
        req.flash("error","Vui long nhap password");
        res.redirect("back");
        return; // bo qua toan bo cac buoc lan buoc tao data moi
      }
    next(); // đi qua hàm controller
}

