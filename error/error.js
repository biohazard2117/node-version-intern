const error_generator = (error_def, error_message) => {
  const err_message = error_def + ": " + error_message;
  throw new Error(err_message);
};

module.exports = error_generator;