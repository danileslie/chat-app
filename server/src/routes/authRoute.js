import e from "express";
import {
  logIn,
  logOut,
  signUp,
  profileUpdate,
  checkAuth,
} from "../controllers/authController.js";
import protectRoute from "../middleware/middleware.js";

const router = e.Router();

// auth routes, needed to determine levels of authentication
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

//these are dependant on authentication
router.put("/profile-update", protectRoute, profileUpdate);
router.get("/check", protectRoute, checkAuth);

export default router;
