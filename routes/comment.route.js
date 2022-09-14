'use strict';

const express = require( 'express' );
const router = express.Router();

const  {Comment,CommentModel}  = require( '../models/index' );

// Routes
router.get( '/comment', getAllComments );
// router.get( '/comment/:id', getOneComment );
router.post( '/comment/:id', addComment );
router.put( '/comment/:id', updateComment );
router.delete( '/comment/:id', deleteComment );

// Get all comments method
async function getAllComments (req, res){
    let comments = await Comment.read();
    res.status(200).json( {
        comments
    } );
}

// Get one comment method
// async function getOneComment ( req, res ) {
//     const id = req.params.id;
//     const comment = await Comment.findOne( {
//         where: { id: id }
//     } );
//     res.status(200).json( comment );
// }


// Create comment method
async function addComment(req, res) {
    const postId = req.params.id;
    const content = req.body.content;
    const obj = {
        'ownerID':postId,
       'content':content,
    };
    await Comment.create( obj )
        .then( async () => {
            await Comment.read()
                .then( ( comments ) => {
                    res.status( 200 ).json( comments );
                } );
        } );
};

// Update comment method
async function updateComment ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await Comment.update( id,obj );
    res.status( 201 ).json( comment );
}
  
// Delete comment method
async function deleteComment(req, res) {
    const id = req.params.id;
    await Comment.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );

}

module.exports = router;