import { Router } from "express";

import { registerUser, loginUser, logoutUser, logoutAllDevices, getAllResumes, addResume } from '../controllers/User.Controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";





const UserRouter = Router();


UserRouter.route('/registeruser').post(registerUser);
UserRouter.route('/loginuser').post(loginUser);
UserRouter.post("/logout", verifyJWT, logoutUser);
UserRouter.post("/logout-all", verifyJWT, logoutAllDevices);
UserRouter.route('/getallresume').get(verifyJWT,getAllResumes);
UserRouter.post("/addresume", verifyJWT, addResume);

export default UserRouter;
