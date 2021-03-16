module.exports = (req, res, next) => {
  res.status(200).send({ auth: false, token: null, message: "Success Logout" });
};
