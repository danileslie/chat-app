import imageKit from "../lib/imagekit.js";
import generateToken from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled." });
    }
    // check unique email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // check pw
    const salt = await bcrypt.genSalt();
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }
    // bcrypt for pw hashing
    const pwHash = await bcrypt.hash(password, salt);

    // create new user with valid credentials. store hashed pw instead of real one
    const newUser = new User({
      userName,
      email,
      password: pwHash,
    });

    // successful creation
    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      //   save new user to db
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      // failed creation
      return res.status(400).json({ message: "Invalid user data submitted." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // checking if user exists and if pw is correct
    const user = await User.findOne({ email });

    // for security, don't mention which part of the login process is incorrect
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //checkpw const needs to be placed below user check or it will return an error
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user.id,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const logOut = (req, res) => {
  try {
    // obliterate cookie on logout
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "logged out successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const profileUpdate = async (req, res) => {
  try {
    // updating profile image
    const { profilePic } = req.body;
    //user received from protectRoute
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture required." });
    }

    const upload = await imageKit.upload({
      file: profilePic, // base64 string or file path or URL
      fileName: "profile-pic.jpg",
    });
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: upload.url,
      },
      // gives object after update was applied
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// redirect function if user is not authenticated
const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { signUp, logIn, logOut, profileUpdate, checkAuth };
