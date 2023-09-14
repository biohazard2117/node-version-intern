const bcrypt = require("bcrypt");
const logger = require("../logger");

const hash_password = async (password) => {
  const salt = await bcrypt.genSalt(10);
  if (password !== "") {
    return (password = await bcrypt.hash(password, salt));
  } else {
    logger.error("Password cannot be empty string");
  }
};

module.exports = hash_password;
