const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("social-media-app", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
