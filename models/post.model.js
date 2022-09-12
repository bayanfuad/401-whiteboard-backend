'use strict';

const Post = (sequelize, DataTypes) => sequelize.define('Post', {
  postTitle: {
    type: DataTypes.STRING,
    allowNull: false
  }
  ,
  postContent: {
    type: DataTypes.STRING,
  },
  showContent: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Post;