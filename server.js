const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./logger");
const { join } = require("path");

// dotenv.config({ path: join(__dirname, `.env.${process.env.NODE_ENV}`) });
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// api routes
app.use("/api/user", userRoutes);
app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(400).send(err.message);
});
app.use("/api/test", (req, res) => {
  res.json({ message: "hi" }).status(200);
});

const server = app.listen(
  PORT,
  logger.debug(`Server running on PORT : http://localhost:${PORT}`)
);

module.exports = app;
