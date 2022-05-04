const ErrorHandler = require('../Utils/ErrorHandler');



module.exports = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;

    err.message = err.message || "Internal Server Error";

    // WRONG MONGODB ERROR
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }


    // MONGOOSE DUPLICATE KEY ERROR
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }


    // JWT-TOKEN ERROR
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is Invalid, Try again.`;
        err = new ErrorHandler(message,400);
    }


    // JWT EXPIRE ERROR
    if(err.name === "TokenExpireError"){
        const message = `Json web token is Expired, Try again.`;
        err = new ErrorHandler(message,400);
    } 



    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}