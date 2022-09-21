'use strict';

const express = require( 'express' );
const router = express.Router();

const { commentCollection, userModel, commentModel } = require( '../models/index' );


// Routes
router.get( '/comment', getAllComments );
router.get( '/comment/:postID/:userID', getComment );
// router.get( '/comment/:id', getOneComment );
router.post( '/comment/:postID/:userID', addComment );
router.put( '/comment/:id', updateComment );
router.delete( '/comment/:id', deleteComment );

// Get all comments method
async function getAllComments (req, res){
    let comments = await commentCollection.read();
    res.status(200).json( {
        comments
    } );
}

// Get one comment method
async function getComment ( req, res ) {
    const postID = req.params.postID;
    const userID = req.params.userID;
    const comments = await commentModel.findAll( {
        where: {
            postID: postID,
            userID: userID
        },
        include: [ userModel ]
    } );
    const response = comments.map( ( comment ) => {
        return {
            id: comment.id,
            content: comment.content,
            postID: comment.postID,
            user: {
                id: comment.User.id,
                username: comment.User.username,
                avatar: comment.User.avatar
            }
        };
    } );
    res.status( 200 ).json( response );
}


// async function getOneComment ( req, res ) {
//     const id = req.params.id;
//     const comment = await Comment.findOne( {
//         where: { id: id }
//     } );
//     res.status(200).json( comment );
// }


// Create comment method
async function addComment(req, res) {
    const postID = req.params.postID;
    const content = req.body.content;
    const userID = req.params.userID;
    const obj = {postID, content, userID};

    await commentCollection.create( obj )
        .then( async () => {
            await commentCollection.read()
                .then( ( comments ) => {
                    res.status( 200 ).json( comments );
                } );
        } );
};

// Update comment method
async function updateComment ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await commentCollection.update( id,obj );
    res.status( 201 ).json( comment );
}
  
// Delete comment method
async function deleteComment(req, res) {
    const id = req.params.id;
    await commentCollection.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );

}

module.exports = router;