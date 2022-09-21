'use strict';

const express = require( 'express' );
const router = express.Router();

const {postCollection, commentModel, postModel, userModel} = require( '../models/index' );

// Routes
router.get( '/post', getAllPostswithComments );
router.get( '/post/:id', getOnePostWithComments );
router.post( '/post', addPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );

async function getAllPostswithComments ( req, res ) {
    const comments = await commentModel.findAll({include: [ userModel ]});
    let posts = await postModel.findAll( {
        include: [userModel]
        } );
    posts = posts.map( ( post ) => {
        post.dataValues.comments = comments.filter( ( comment ) => {
            return comment.postID === post.id;
        } );
        return post;
    } );
    const response = posts.map( ( post ) => {
        return {
            id: post.id,
            postTitle: post.title,
            postContent: post.content,
            user : {
                id: post.User.id,
                username: post.User.username
            
            },
            comments: post.dataValues.comments?.map( ( comment ) => {
                return {
                    id: comment.id,
                    content: comment.content,
                    postID: comment.postID,
                    user: {
                        id: comment.User.id,
                        username: comment.User.username
                    }
                };
            } )
        };
    } );
    res.status( 200 ).json( response );
}

async function getOnePostWithComments ( req, res ) {
    const id = req.params.id;
    const comments = await commentModel.findAll( {
        where: {
            postID: id
        },
        include: [ userModel ]
    } );
    const post = await postModel.findOne( {
        where: {
            id: id
        },
        include: [ userModel ]
    } );
    post.dataValues.comments = comments;
    res.status( 200 ).json( post );
}


async function addPost ( req, res ) {
    const newPost = req.body;
    await postCollection.create( newPost )
        .then( async () => {
            await postCollection.read()
                .then( ( posts ) => {
                    res.status( 201 ).json( posts );
                } );
        } );
}


async function updatePost ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const post = await postCollection.update( id, obj );
    res.status( 201 ).json( post );
}


async function deletePost ( req, res ) {
    const id = req.params.id;
    const comments = await commentModel.findAll( {
        where: {
            postID: id
        }
    } );
    comments.forEach( async ( comment ) => {
        await commentModel.destroy( {
            where: {
                id: comment.id
            }
        } );
    } );
    await postCollection.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}



module.exports = router;