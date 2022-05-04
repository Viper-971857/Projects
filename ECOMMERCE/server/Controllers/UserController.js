const User = require('../Models/UserModels');
const ErrorHandler = require('../Utils/ErrorHandler');
const CatchAsyncErrors = require('../MiddleWare/CatchAsyncError');
const SendToken = require('../Utils/JwtToken');
const sendEmail = require('../Utils/SendEmail')
const crypto = require('crypto');


// REGISTER A USER
exports.RegisterUser = CatchAsyncErrors(async (req,res,next) => {

    const {name,email,password} = req.body

    const user = await User.create({
        name,email,password
    })

    SendToken(user,201,res);

});




// USER LOGIN
exports.LoginUser = CatchAsyncErrors (async(req,res,next) => {

    const {email,password} = req.body

// CHECKING IF USER HAS GIVEN PASSWORD AND EMAIL BOTH
    if(!email || !password){
        return next(new ErrorHandler('please enter email & password',400))
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email or password',401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password',401))
    }

    SendToken(user,200,res);

});




// USERS LOGOUT
exports.LogoutUser = CatchAsyncErrors(async(req,res,next) => {

    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'Logged Out'
    })

});




// FORGOT PASSWORD
exports.ForgotPassword = CatchAsyncErrors(async(req,res,next) => {

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler('user not found',404))
    }

    // GET RESET PASSWORD TOKEN
    const ResetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    const ResetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${ResetToken}`

    const message = `Your password reset token is :- \n\n ${ResetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {

        await sendEmail({
            email:user.email,
            subject:`Ecommerce password Recovery`,
            message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
        
    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})

        return next(new ErrorHandler(error.message,500))
    }

});




// RESET PASSWORD
exports.ResetPassword = CatchAsyncErrors(async(req,res,next) => {

    // CREATING TOKEN HASH
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return next(new ErrorHandler('Reset password Token is invalid or has been expired',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    SendToken(user,200,res);

})




// GET USER DETAILS
exports.getUserDetails = CatchAsyncErrors(async(req,res,next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })

})




// UPDATE USER PASSWORD
exports.updatePassword = CatchAsyncErrors(async(req,res,next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Old password is incorrect',400))
    };

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not matched',400));
    };

    user.password = req.body.newPassword;

    await user.save();

    SendToken(user,200,res)

});




// UPDATE USER PROFILE
exports.updateProfile = CatchAsyncErrors(async(req,res,next) => {

    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
    })

});



// =========================== FOR ADMIN USE ONLY =====================================

// GET ALL USERS
exports.getAllUsers = CatchAsyncErrors(async(req,res,next) => {

    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })

});


// GET ALL USERS DETAILS
exports.getAllUsersDetails = CatchAsyncErrors(async(req,res,next) => {

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.body.params}`))
    }

    res.status(200).json({
        success:true,
        user
    })

});


// UPDATE USER ROLE
exports.setRole = CatchAsyncErrors(async(req,res,next) => {

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    if(!user){
        return next(new ErrorHandler(`User role not exist wit Id: ${req.params.id}`,400))
    }

    await user.save();

    res.status(200).json({
        success:true,
    })

});


// DELETE USER
exports.deleteUser = CatchAsyncErrors(async(req,res,next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist wit Id: ${req.params.id}`,400))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:'User has been deleted'
    })

});
