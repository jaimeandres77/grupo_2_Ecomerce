const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'./../../public/img/products'));
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}_product${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage})

module.exports = upload;