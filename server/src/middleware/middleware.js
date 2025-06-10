import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// protecting routes ensures that only specific authenticated user can access them
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: `Unauthorized: No token provided.` });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(401).json({ message: `Unauthorized : Token invalid.` });
    }

    // return everything except user password
    const user = await User.findById(verify.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: `User not found.` });
    }
    // if user is authenticated, do this
    req.user = user;
    // next moves to next function after verification (in authroute)
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export default protectRoute;
