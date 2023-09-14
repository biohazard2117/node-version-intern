const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router
  .route("/")
  .post(userControllers.create_user)
  .get(userControllers.get_all_users);

router
  .route("/:id")
  .get(userControllers.get_user)
  .put(userControllers.update_user)
  .delete(userControllers.delete_user);

module.exports = router;
