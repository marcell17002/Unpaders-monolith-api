const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getAll = require("./getAll");
const getById = require("./getById");
const update = require("./update");
const destroy = require("./destroy");
const changePassword = require("./changePassword");

module.exports = {
  register,
  login,
  logout,
  getAll,
  getById,
  update,
  destroy,
  changePassword,
};
