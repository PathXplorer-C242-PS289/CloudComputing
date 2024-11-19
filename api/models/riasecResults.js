const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RiasecResult = sequelize.define(
  "RiasecResult",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    realistic: { type: DataTypes.FLOAT, allowNull: false },
    investigative: { type: DataTypes.FLOAT, allowNull: false },
    artistic: { type: DataTypes.FLOAT, allowNull: false },
    social: { type: DataTypes.FLOAT, allowNull: false },
    enterprising: { type: DataTypes.FLOAT, allowNull: false },
    conventional: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    tableName: "riasec_results",
    timestamps: true,
  }
);

module.exports = RiasecResult;
