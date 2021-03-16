const User = require("../../models/users");
const RefreshToken = require("../../models/refreshToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  JWT_SECRET,
  JWT_REFRESH_TOKEN_EXPIRED,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_SECRET_REFRESH_TOKEN,
} = process.env;

module.exports = (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ status: "error", message: "auth false" });

    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ user }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    const createRefreshToken = new RefreshToken({
      userId: user._id,
      refreshToken: refreshToken,
    });

    createRefreshToken
      .save()
      .then()
      .catch((err) => {
        res.status(500).json({
          status: "error",
          message: "create refresh token failed",
        });
      });

    return res.status(200).send({
      status: "success",
      message: "auth true",
      data: {
        id: user._id,
        email: user.email,
        token: token,
        refreshToken: refreshToken,
      },
    });
  })
    .then()
    .catch((err) => {
      return res.status(400).send({
        status: "error",
        message: "auth false",
      });
    });
};
