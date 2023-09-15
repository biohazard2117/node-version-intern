const knex = require("../db/db");
const logger = require("../logger");
const hash_password = require("../utils/generateHash");
const userSchema = require("../schema/userSchema");
const error_generator = require("../error/error");

const create_user = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) error_generator("Validation Error", error.details[0].message);
  const { username, email, password, name } = req.body;
  const new_password = await hash_password(password);
  const data = await knex("Users")
    .insert({
      username,
      email,
      password: new_password,
      name,
    })
    .returning(["id", "name", "username"])
    .catch((err) => {
      error_generator("Error updating user", err);
    });
  res.status(201).json({ data: data });
};

const get_all_users = async (req, res) => {
  const users = await knex
    .select("name", "id", "username", "email")
    .from("Users")
    .catch((err) => {
      error_generator("Error getting list of users", err);
    });
  res.status(200).json({ data: users });
};

const get_user = async (req, res) => {
  const id = req.params["id"];
  const user = await knex("Users")
    .where("id", id)
    .select(["email", "name", "username"])
    .catch((err) => {
      error_generator("Error getting user", err);
    });

  if (Object.keys(user).length === 0)
    error_generator(`No user with found with id`, id);

  res.json({ data: user });
};

const update_user = async (req, res) => {
  const id = req.params["id"];
  let { email, username } = req.body;
  const user = await knex("Users")
    .where("id", id)
    .select(["email", "username"])
    .catch((err) => {
      error_generator("Error updating user:", err);
    });

  // if user not found
  if (Object.keys(user).length === 0) {
    error_generator(`No user with found with id`, id);
  }

  username = username ? username : user.username;
  email = email ? email : user.email;

  const data = knex("Users").where("id", id).update({
    username,
    email,
  });

  knex("Users")
    .where("id", id)
    .update({
      username,
      email,
    })
    .catch((err) => {
      error_generator("Error updating user:", err);
    });

  res.status(200).json({ data: "Updated Successfully" });
};

const delete_user = async (req, res) => {
  const id = req.params["id"];

  await knex("Users")
    .where("id", id)
    .del()
    .then((numUpdated) => {
      if (numUpdated == 0) error_generator(`No user with found with id`, id);
    })
    .catch((err) => {
      error_generator("Error deleting the user:", err);
    });

  res.json({ data: "User deleted" });
};

module.exports = {
  create_user,
  get_all_users,
  get_user,
  update_user,
  delete_user,
};
