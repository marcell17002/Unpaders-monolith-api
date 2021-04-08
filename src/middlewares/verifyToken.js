const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("token :", bearerHeader);
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(403)
          .send({ status: false, message: "Failed to authenticate token." });

      // if everything good, save to request for use in other routes
      req.resultId = decoded.id;
      next();
    });
  } else {
    // Forbidden
    res.status(401).send({ status: "error", message: "No token provided." });
  }
};

module.exports = verifyToken;
