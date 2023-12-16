const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const Comment = sequelize.define("comments", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Comment;
