'use strict';
const Comment = (sequelize, DataTypes) => sequelize.define('Comment', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  ,
  content: {
    type: DataTypes.STRING,
    defaultValue: 'test'
  },
  postID: {
    type: DataTypes.INTEGER,
    allowNull: false
}
})

module.exports = Comment;
