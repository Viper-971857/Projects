const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'please enter your name'],
        maxlength:[30,'Name can not exceed 30 character'],
        minlength:[4,'Name should have more then 4 character']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'please enter your password'],
        minlength:[8,'Password should be grater then 8 character'],
        select:false
    },
    role:{
        type:String,
        default:'user'
    },
        resetPasswordToken:String,
        resetPasswordExpire:Date,
});

UserSchema.pre('save',async function (next){

    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);

});


// JWT TOKEN
UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


// COMPARE PASSWORD
UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


// RESET PASSWORD TOKEN
UserSchema.methods.getResetPasswordToken = function(){

    // GENRATE TOKEN
    const resetToken = crypto.randomBytes(20).toString('hex')

    // HASHING AND ADDING RESETPASSWORDTOKEN TO USERSCHEMA
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;

}

module.exports = mongoose.model('user',UserSchema,'Users');