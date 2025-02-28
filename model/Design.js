const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Design = sequelize.define("Design", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    style: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Design;