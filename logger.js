const { createLogger, transports, format } = require("winston");

const customFormat = format.combine(
  format.timestamp({
    format: "YY-MM-DD HH:mm:ss",
  }),
  format.printf((info) => {
    return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${
      info.message
    }`;
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: "debug", colorize: true }),
    new transports.File({ filename: "./logs/info.log", level: "info" }),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
    new transports.File({ filename: "./logs/warn.log", level: "warn" }),
  ],
  silent: process.env.NODE_ENV === "TEST", // make logger silent when in test env
});

module.exports = logger;
