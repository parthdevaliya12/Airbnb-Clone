import jwt from "jsonwebtoken";
const isauth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "User dose not have a token" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "User dose not have a valid token" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error" });
  }
};


export default isauth