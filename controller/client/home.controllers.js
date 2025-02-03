module.exports.index = (req, res) => { 
    res.render("client/pages/home/index",{
        pageTitle : "Home"
    }); // render in ra giao diện của pug 
}