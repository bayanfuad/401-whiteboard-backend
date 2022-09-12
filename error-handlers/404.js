'use strict'
function handleNotFoundError(req,res,){
    res.status(404).send('error 404 not found');
}

module.exports = {handleNotFoundError};