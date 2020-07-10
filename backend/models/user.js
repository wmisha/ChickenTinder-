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
    User.belongsToMany(models.Group, {
      through: models.UserGroup,
      foreignKey: 'user_id'
    });

    User.hasMany(models.RestaurantVote, {
      foreignKey: 'user_id'
    })

  };
  return User;
};