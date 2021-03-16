const { body } = require("express-validator");

module.exports = (object, criteria) => {
  return body(object)
    .isLength({ min: criteria })
    .withMessage(`Input ${object} min. ${criteria} character`);
};
