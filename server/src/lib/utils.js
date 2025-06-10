import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // payload, secret key, callback
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // when token expires
    expiresIn: "5d",
  });
  //   set token as cookie
  res.cookie("jwt", token, {
    // everything before * 5 = milliseconds in a day
    // set when cookie expires
    maxAge: 24 * 60 * 60 * 1000 * 5,
    // safer against xss attacks
    httpOnly: true,
    // limit CSRF (cross-site request forgery) attacks
    sameSite: "strict",
    // false dev
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};

export default generateToken;
