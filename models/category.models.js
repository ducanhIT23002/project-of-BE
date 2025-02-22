const mongoose = require('mongoose'); // nhung mongoose
const slug = require('mongoose-slug-updater');   // cài đặt slug ( dãy id unique cho từng sản phẩm)
mongoose.plugin(slug) // nhứng vào database

const CateproductSchema = new mongoose.Schema(
    {
        title: String,
        description:String ,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        parent_id: {
            type:String,
            default: ""
        },
        thumbnail: String,
        status:String ,
        position:Number,
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

const categoryProduct  = mongoose.model('categoryProduct ', CateproductSchema,"products-category");

module.exports = categoryProduct ;