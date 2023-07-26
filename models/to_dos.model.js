const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

// todas las tablas van en plural
const To_dos = db.define("to_dos", {
  // por defecto sequelize crea el id como pk y autoincrementable
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(50),
    defaultValue: "to-do ist",
    unique: {
      args: true,
      msg: "Title already exists.",
    },
  },
  description: {
    type: DataTypes.STRING(100),
    defaultValue: "description of the task to be performed.",
  },
  completed: {
    type: DataTypes.STRING, // Sin especificar la longitud
    allowNull: false,
    validate: {
      isIn: {
        args: [["complete", "pending"]],
        msg: "The field can only be 'completed' or 'pending'..",
      },
    },
  },
});

module.exports = To_dos;
