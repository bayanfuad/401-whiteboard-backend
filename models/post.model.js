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
  // showContent: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: true
  // }
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
}
})

module.exports = Post;