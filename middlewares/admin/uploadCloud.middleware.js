// cloud
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// thông tin cloud
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
}) ;

module.exports.upload = (req, res, next) => {  // 3
  if (!req.file) {
    return next(); // Nếu không có file, bỏ qua upload
}
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    

    async function upload(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.secure_url;
        next();
    }
    upload(req); 
}