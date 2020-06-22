'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define('TodoList', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  TodoList.associate = function(models) {
      TodoList.belongsTo(models.User, {
          foreignKey: 'user_id',
      })

      TodoList.hasMany(models.Todo, {
        foreignKey: 'todo_list_id',
      })
  };
  return TodoList;
};