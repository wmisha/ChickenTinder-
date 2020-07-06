'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    pwd_hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    User.hasMany(models.TodoList, {
      foreignKey: 'user_id',
      as: 'todoLists'
    });
    User.hasMany(models.UserGroup, {
      foreignKey: 'user_id',
      as: 'groups'
    });

  };
  return User;
};