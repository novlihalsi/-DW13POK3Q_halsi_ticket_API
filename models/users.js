"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.events, {
      as: "event",
      foreignKey: "user_id"
    });
    users.hasMany(models.orders, {
      as: "order",
      foreignKey: "user_id"
    });
    users.hasMany(models.favorites, {
      as: "favorite",
      foreignKey: "user_id"
    });
  };
  return users;
};
