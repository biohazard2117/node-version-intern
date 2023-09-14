const knex = require("../db/db");
const logger = require("../logger");
const hash_password = require("../utils/generateHash");

const create_user = async (req, res) => {
  // TODO : Check if the user already exists with same email
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
      logger.error("Error updating user:", err);
      return res.status(201).json({ message: "Error updating user" });
    });
  res.status(201).json({ data: data });
};

const get_all_users = async (req, res) => {
  const users = await knex
    .select("name", "id", "username", "email")
    .from("Users")
    .catch((err) => {
      logger.error("Error updating user:", err);
    });
  res.status(200).json({ data: users });
};

const get_user = async (req, res) => {
  const id = req.params["id"];
  const user = await knex("Users")
    .where("id", id)
    .select(["email", "name", "username"])
    .catch((err) => {
      logger.error("Error updating user:", err);
    });

  if (Object.keys(user).length === 0) {
    logger.info(`No user with id :${id} found`);
    return res.status(204).json();
  }

  res.json({ data: user });
};

const update_user = async (req, res) => {
  const id = req.params["id"];
  let { email, username } = req.body;
  // TODO if email already exists send error
  const user = await knex("Users")
    .where("id", id)
    .select(["email", "username"])
    .catch((err) => {
      logger.error("Error updating user:", err);
    });

  // if user not found
  if (Object.keys(user).length === 0) {
    logger.info(`No user with id :${id} found`);
    return res.status(204).json();
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
      logger.error("Error updating user:", err);
    });

  res.status(200).json({ data: "Updated Successfully" });
};

const delete_user = async (req, res) => {
  const id = req.params["id"];

  await knex("Users")
    .where("id", id)
    .del()
    .then((numUpdated) => {
      if (numUpdated > 0) {
        logger.info(`User with ID ${id} updated successfully.`);
      } else {
        logger.info(`User with ID ${id} not found.`);
      }
    })
    .catch((err) => {
      logger.error("Error updating user:", err);
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
