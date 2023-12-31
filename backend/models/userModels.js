const mongoose =require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter you name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 5 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter you Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter you Password"],
        minLength:[8,"Minimum 8 characters required"],
        select:false
    },
    confirmation:{
        type:String,
        default:"inactive"
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },   
    role:{
        type:String,
        default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken:String,
    verifyMailToken:String,
    resetPasswordExpire:Date,
    verifyMailExpire:Date,
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }

    this.password=await bcrypt.hash(this.password,10);
});

// JWT TOKEN
userSchema.methods.getJWTToken =function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

// compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Reset Password Token generation
userSchema.methods.getResetPasswordToken=function()
{
    const resetToken=crypto.randomBytes(20).toString("hex")

    // Hashing and adding resetPasswordTOken to userSchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*100;

    return resetToken;
}

userSchema.methods.getMailVerifyToken=function()
{
    const resetToken=crypto.randomBytes(20).toString("hex");
    // Hashing and adding resetPasswordTOken to userSchema
    this.verifyMailToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.verifyMailExpire=Date.now()+15*60*100;
    console.log(this.verifyMailToken)
    return resetToken;

}
module.exports=mongoose.model("User",userSchema)