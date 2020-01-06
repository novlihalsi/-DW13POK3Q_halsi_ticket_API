"use strict";
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      event_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.events, {
      as: "events",
      foreignKey: "event_id"
    });
    orders.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id"
    });
  };
  return orders;
};
