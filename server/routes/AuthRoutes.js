import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/AuthController.js";//make sure to write .js
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes=Router();
authRoutes.post("/signup",signup)
authRoutes.post("/login",login)
authRoutes.get('/user-info',verifyToken,getUserInfo)//verifyToken is the middleware here it,verifys the token inside request as well as extract userId
                                                   // from token and add in the request ,then that request is passed to getUserInfo controller
export default authRoutes;