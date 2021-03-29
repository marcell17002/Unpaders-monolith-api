const { body } = require("express-validator");

module.exports = (object, criteria, required) => {
  if (required) {
    return body(object).notEmpty();
  } else {
    return body(object)
      .isLength({ min: criteria })
      .withMessage(`Input ${object} min. ${criteria} character`);
  }
};
