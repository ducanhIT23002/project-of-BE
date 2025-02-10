const mongoose = require('mongoose'); // nhung mongoose

module.exports.connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);// lien ket voi database
       
    } catch (error) {
        console.log("error")
    }
}

