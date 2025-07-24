import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteResume 
} from "../controllers/User.Controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const UserRouter = Router();

// Routes
UserRouter.route('/registeruser').post(registerUser);
UserRouter.route('/loginuser').post(loginUser);
UserRouter.post('/logout', verifyJWT, logoutUser);
UserRouter.delete('/deleteresume/:id', verifyJWT, deleteResume);

export default UserRouter;
