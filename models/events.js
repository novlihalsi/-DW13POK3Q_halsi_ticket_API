"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      urlMaps: DataTypes.STRING,
      image: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  events.associate = function(models) {
    events.belongsTo(models.categories, {
      as: "category",
      foreignKey: "category_id"
    });
    events.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id"
    });
    events.hasMany(models.orders, {
      as: "orders",
      foreignKey: "event_id"
    });
    events.hasMany(models.favorites, {
      as: "favorite",
      foreignKey: "event_id"
    });
  };
  return events;
};
