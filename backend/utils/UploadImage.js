const cloudinary = require('cloudinary').v2;
const path = require('path');

/**
 * UploadImage function - This Function is to upload Image in Cloudinary 
 * @param {*} data - Upload the Local Image to Cloudinary and return the result  
 * @returns {String} - Return the Image URL
 */
const UploadImage = async (data) => {
    const imagePath = path.join(__dirname, "../public/img/user/", data);
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
    });
    try{
        const result=await cloudinary.uploader.upload(imagePath);
        return result.secure_url;
    }catch(err){
        console.log(err);
    }
};

module.exports = { UploadImage };
