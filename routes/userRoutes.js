const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

// middleware to handle the errors 
const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


router
  .route("/")
  .post(use(userControllers.create_user))
  .get(use(userControllers.get_all_users));

router
  .route("/:id")
  .get(use(userControllers.get_user))
  .put(use(userControllers.update_user))
  .delete(use(userControllers.delete_user));

module.exports = router;
