'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    pwd_hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Todo, {
      foreignKey: 'user_id',
      as: 'todos'
    })
  };
  return User;
};