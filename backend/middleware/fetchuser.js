const jws = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "MyJWTSecretKey";

const fetchuser = (req, res, next) => {
  //getting token from request header
  const token = req.header("authtoken");
  //if token does not exist then
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate with valid token" });
  }

  try {
    //fetch user data(user id) by verifying token
    const data = jws.verify(token, JWT_SECRET);
    //current user data
    req.user = data.user;
    //proceed to next fn after middleware --
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate with valid token" });
  }
};

module.exports = fetchuser;
