'use strict';

const User = require( '../models' ).UserModel;

const saveUser = async ( req, res, next ) => {
    try {
        const username = await User.findOne( {
            where: {
                username: req.body.username
            }
        } );
        if ( username ) {
            return res.status( 409 ).send( 'Username is already exist' );
        }
        const email = await User.findOne( {
            where: {
                email: req.body.email
            }
        } );
        if ( email ) {
            return res.status( 409 ).send( 'Email is already exist' );
        }
        next();
    } catch ( e ) {
        console.log( e );
    }
};

module.exports = {
    saveUser
};