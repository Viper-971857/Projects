const User = require('../Models/UserModels');
const ErrorHandler = require('../Utils/ErrorHandler');
const CatchAsyncErrors = require('./CatchAsyncError');
const jwt = require('jsonwebtoken');



exports.isAuthUser = CatchAsyncErrors(async(req,res,next) => {

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler('Please login to access this resource',401))
    }

    const DecodedData = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(DecodedData.id)

    next();

});



// DEFINING ROLES
exports.AuthRoles = (...roles) => {

    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
           return next( 
               new ErrorHandler(`Role: ${req.user.role} is not allowed access this resource`,403)
               );
        }

        next();

    }

}