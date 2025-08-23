import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnClodinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            console.log("Local file path missing")
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw"
        })

        if(!response){
            console.log("upload failed")
            return null
        }
        console.log("Upload successfull on cloudinary\n", response)
        fs.unlinkSync(localFilePath)
        //deleting the file from local after successfull upload
        return response
    } catch (error) {
      fs.unlinkSync(localFilePath);
      //remove the locally saved temporarily file as operation failed
      console.error("Cloudinary upload failed: ", error)
      return null
    }
}