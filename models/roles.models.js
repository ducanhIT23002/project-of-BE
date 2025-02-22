const mongoose = require('mongoose'); // nhung mongoose


const rolesSchema = new mongoose.Schema(
    {
        title: String,
        description : String,
        permissions: Array,
        deleted: {
          type : Boolean,
          default : false
        } ,
        deleteAt: Date 
        
    } , {
    timestamps: true
});

const role = mongoose.model('role', rolesSchema,"roles");

module.exports = role;