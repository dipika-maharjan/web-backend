const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Customer = require("./Customer");
const Design = require("./Design");

const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: "id"
        }
    },
    designId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Design,
            key: "id"
        }
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    room_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    design_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isDate: true }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    }
}, { timestamps: true });

// Define associations
Booking.belongsTo(Customer, { foreignKey: "customerId" });
Booking.belongsTo(Design, { foreignKey: "designId" });

module.exports = Booking;
