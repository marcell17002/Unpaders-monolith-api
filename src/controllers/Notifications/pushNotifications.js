const admin = require("firebase-admin");

module.exports = (req, res, next) => {
  if (!(req.body.token && req.body.title && req.body.body))
    throw new Error("Data tidak boleh kosong");

  const payload = {
    data: req.body.data ? req.body.data : {},
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
  };

  admin
    .messaging()
    .sendToDevice(req.body.token, payload)
    .then((result) => {
      res.status(201).json({
        status: "success",
        message: "Notification has been send ",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
};
