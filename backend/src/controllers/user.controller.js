const user = require('../models/userModel.js')
const session = require('../models/sessionModel.js')
const bcrypt = require('bcrypt')
const {emailVerify} = require('../email/emailVerify.js')
const jwt = require('jsonwebtoken')
const sessionModel = require('../models/sessionModel.js')
const {sendOtp} = require('../email/sendOtp.js')

module.exports.registerUser = async (req,res) =>{
    try {
        // Destructuring taking out the parameters from the request body
        const {username , name , email, password} = req.body;

        // verifying if all input boxes are filled properly and none of the input boxes are empty
        if(!username || !name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //checking if user already exists with same email
        const existingUser = await user.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User already exits with the same email"
            })
        }

        //checking if user already exists with same username
        const existingUsername = await user.findOne({username})
        if(existingUsername){
            return res.status(400).json({
                success:false,
                message: "Username is already being used by someone"
            })
        }

        //registering new user
        //hashing to convert the password into a block on unrecognisable string
        const hashedPswd = await bcrypt.hash(password, 10)
        const newUser = await user.create({
            username, 
            name, 
            email, 
            password:hashedPswd
        })

        //tokenization using jwt
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'10m'})

        emailVerify(token , email, name);
        newUser.token = token;
        await newUser.save();

        return res.status(201).json({
            success:true,
            message:"User registered succesfully",
            data: newUser
        })        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports.verification = async (req,res)=>{
    try {
        //extracts authorization header from the request , authorization header is the like a enevelop note attached to the req that answers "who are u and how can I verify u?"
        const authheader = req.headers.authorization;
        if(!authheader || !authheader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"Authorization token is empty or invalid"
            })
        }
        //extract the token
        const token = authheader.split(" ")[1]
        //consist of jwt verification result i.e id, role → your data (payload) iat → issued at (timestamp) exp → expiry time (timestamp)
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({
                    success:false,
                    message:" Email verification token has expired"
                })
            }
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
        //checks if users exists or not
        const emailUser = await user.findById(decoded.id)
        if(!emailUser){
            return res.status(400).json({
                success:false,
                message:" User does not exists"
            })
        }
        emailUser.token = null;
        emailUser.isVerified = true;
        await emailUser.save();

        return res.status(200).json({
                success:true,
                message:"Email is verified"
        })

    } catch (error) {
        return res.status(500).json({
                success:false,
                message:error.message
        })
    }
    

}

module.exports.loginUser = async (req,res)=>{
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // Check if there is any user in the database with the same user name
        const userCheck = await user.findOne({username})
        if(!userCheck){
            return res.status(401).json({
                success:false,
                message:"No user found in this username"
            })
        }

        // Compares the hashed password to check if user is entering the valid password or authorized password 
        const passCheck = await bcrypt.compare(password , userCheck.password);
        if(!passCheck){
            return res.status(402).json({
                success:false,
                message:" You've entered the wrong password"
            })
        }

        // Checks if the user has verified their account
        if(userCheck.isVerified !== true){
            return res.status(403).json({
                success:false,
                message:" Verify your account and then login"
            })
        }

        // Check if user has an ongoing session and delete it
        const existingSession = await session.findOne({userId:userCheck._id})
        if(existingSession){
            await session.deleteOne({userId:userCheck._id})
        }

        //create new session
        await session.create({userId:userCheck._id})

        //generate tokens
        const accessToken = jwt.sign({id:userCheck._id},process.env.JWT_SECRET_KEY,{expiresIn:'10d'})
        const refreshToken =jwt.sign({id:userCheck._id},process.env.JWT_SECRET_KEY,{expiresIn:'30d'})

        userCheck.isLoggedIn = true;
        await userCheck.save();

        return res.status(200).json({
                success:true,
                message:`Welcome back ${userCheck.username}`,
                accessToken,
                refreshToken,
                userCheck
        })
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:error.message
        })
    }
    
}

module.exports.logoutUser = async (req,res)=>{
    try {
        const userId = req.userId;
        await sessionModel.deleteMany({userId});
        await user.findByIdAndUpdate(userId,{isLoggedIn:false})

        return res.status(200).json({
            success:true,
            message:"User is successfully logged out"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports.forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        const User = await user.findOne({email})

        if(!User){
           return res.status(404).json({
                success:false,
                message:" User does not exist"
            }) 
        }
        const otp = Math.floor((Math.random() * 900000) + 100000).toString();
        //otp valid for 5mins
        const otpExpiry = new Date(Date.now() + 5*60*1000);

        User.otp = otp;
        User.otpExpiry = otpExpiry;

        await User.save();
        await sendOtp(email , otp);

        return res.status(200).json({
            success:true,
            message:" Password changed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports.verifyOtp = async (req,res)=>{
    const {otp} = req.body;
    const email = req.params.email;

    if(!otp){
        return res.status(401).json({
            success:false,
            message:"Otp is required"
        }) 
    }

    try {
        const User = await user.findOne({email})

        // To check if user exists
        if(!User){
           return res.status(404).json({
                success:false,
                message:" User does not exist"
            }) 
        }
        // To check if the OTB or the OTP expiry exists inside the database of that particular user
        if(!User.otp || !User.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"Otp not generated or already verified"
            }) 
        }
        // To Check if the OTP has expired or not
        if(User.otpExpiry < new Date()){
            return res.status(400).json({
                success:false,
                message:" OTP has expired, generate a new one"
            }) 
        }

        if(otp !== User.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        User.otp = null;
        User.otpExpiry = null;
        await User.save();

        return res.status(200).json({
            success:true,
            message:'Otp Veified Succesfully'
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports.changePassword = async (req,res)=>{
    const {newPassword , confirmPassword} = req.body;
    const email =req.params.email;

    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password do not match"
        })
    }

    try {
        const User = await user.findOne({email});

        if(!User){
           return res.status(404).json({
                success:false,
                message:" User does not exist"
            }) 
        }

        const hashedPassword = await bcrypt.hash(newPassword , 10);

        User.password = hashedPassword;
        await User.save();

        return res.status(200).json({
            success:true,
            message:" Password changed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}