'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    todo: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  };
  return Todo;
};