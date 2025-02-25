const mongoose = require('mongoose'); // nhung mongoose
const slug = require('mongoose-slug-updater');   // cài đặt slug ( dãy id unique cho từng sản phẩm)
mongoose.plugin(slug) // nhứng vào database

const productSchema = new mongoose.Schema(
    {
        title: String,
        description:String ,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status:String ,
        position:Number,
        createBy : {
         account_id : String,
         createAt : {
          type : Date,
          default : Date.now
         }
        },
        slug: {
             type: String,
             slug: "title",
             unique : true // tạo dãy id duy nhất 
             },
        deleted: {
          type : Boolean,
          default : false
        } ,
        deleteAt: Date 
        
    } , {
    timestamps: true
});

const product = mongoose.model('product', productSchema,"products");

module.exports = product;