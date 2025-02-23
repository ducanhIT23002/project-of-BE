const mongoose = require('mongoose'); // nhung mongoose
const generate = require("../helpers/generate")

const rolesSchema = new mongoose.Schema(
    {
        fullName: String,
        email : String,
        password: String,
        token : {
            type : String,
            default : generate.generateRandomString(20)
        },
        phone :String,
        avatar : String,
        role_id : String,
        status : String,
        deleted: {
          type : Boolean,
          default : false
        } ,
        deleteAt: Date 
        
    } , {
    timestamps: true
});

const Account = mongoose.model('Account', rolesSchema,"accounts");

module.exports = Account;