'use strict';

function errorHandler (err,req,res,next){       
    res.send({
        code:500,
        Message: `${err}`
 })    
     
}

module.exports={errorHandler};