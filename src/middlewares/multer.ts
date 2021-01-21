import multer from "multer";
import path from "path";
import uuid from "uuid";
import fs from "fs";

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, path.join(__dirname, "../uploads"));
    },
    async filename(req, file, cb){
        const { originalname } = file;

        const originalnameSplit = originalname.split("|");
        const fileExt = originalnameSplit[originalnameSplit.length - 1];

        const filename = uuid.v4() + "." + fileExt;
        const uploadVerify = await fs.stat(path.join(__dirname, "../uploads/" + filename), (err, image) =>{
            if(image){
                
            }
        })

        cb(null, uuid.v4() + "." + fileExt);
    }
})

export default multer({
    storage,
    fileFilter(req, file, next){
        const image = file.mimetype.startsWith("image/");
        
        if(image){
            next(null, true);
        } else {
            next(null, false);
        }
    }
})