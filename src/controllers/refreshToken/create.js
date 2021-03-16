const RefreshToken = require("../../models/refreshToken");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_SECRET_REFRESH_TOKEN,
} = process.env;

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const email = req.body.email;

    if (!refreshToken || !email) {
      return res.status(400).json({
        status: "error",
        message: "invalid token",
      });
    }

    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: err.message,
        });
      }
      console.log("decoded ", decoded);
      if (email !== decoded.user.email) {
        return res.status(400).json({
          status: "error",
          message: "email is not valid",
        });
      }

      const token = jwt.sign({ data: decoded.user }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });
      return res.json({
        status: "success",
        data: {
          token,
        },
      });
    });
  } catch (error) {
    console.log("ini error ", error);
  }
};
