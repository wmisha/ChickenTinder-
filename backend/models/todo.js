'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    todo: DataTypes.STRING,
    todo_list_id: DataTypes.INTEGER
  }, {});

  Todo.associate = function(models) {

    Todo.belongsTo(models.TodoList,{
      foreignKey: 'todo_list_id',
      as: 'list'
    })

    Todo.belongsTo(models.User, {
      through: models.TodoList,
      foreignKey: 'todo_list_id',
      otherKey: 'user_id'
    })

  };
  return Todo;
};