 'use strict';
 require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model'); 
const collection = require('../collection/user-comment-routes');
const user = require( './user.model' );
const POSTGRES_URL = process.env.DATABASE_URL;

const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

let sequelize = new Sequelize (POSTGRES_URL,sequelizeOption);
const postModel = post(sequelize,DataTypes);
const commentModel = comment(sequelize,DataTypes);

const userModel = user(sequelize, DataTypes);

postModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'});
commentModel.belongsTo(postModel, {foreignKey: 'ownerID', targetKey: 'id'});

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);

module.exports = {
  db: sequelize,   //used in index.js
  Post: postCollection, //used in routes
  Comment:commentCollection,
  CommentModel: commentModel,
  UserModel: userModel
}