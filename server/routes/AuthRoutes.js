import { Router } from "express";
import { getUserInfo, login, signup,updateProfile,addProfileImage ,removeProfileImage} from "../controllers/AuthController.js";//make sure to write .js
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes=Router();
//Multer is a middleware for handling multipart/form-data
//Multer parses incoming multipart/form-data requests, extracting the files and other form data from the request and making them available in your
// request object.
const upload=multer({dest:"uploads/profiles/"})//"uploads/profiles/": This option specifies the destination directory where uploaded files should be
                                            // saved. In this case, uploaded files will be stored in the "uploads/profiles/" directory on your server
                                            //multer saves it to this directory with a randomly generated name.
authRoutes.post("/signup",signup)
authRoutes.post("/login",login)
authRoutes.get('/user-info',verifyToken,getUserInfo)//verifyToken is the middleware here it,verifys the token inside request as well as extract userId
                                                   // from token and add in the request ,then that request is passed to getUserInfo controller
 authRoutes.post('/update-profile',verifyToken,updateProfile)  
 authRoutes.post('/add-profile-image',verifyToken,upload.single("profile-image"),addProfileImage)        ; 
 authRoutes.delete('/remove-profile-image',verifyToken,removeProfileImage)                                       
export default authRoutes;  