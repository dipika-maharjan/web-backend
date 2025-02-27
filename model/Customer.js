const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Customer = sequelize.define("Customer", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false, // Full name is required
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures valid email format
    },
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: true, // Contact number is required
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Customer;
