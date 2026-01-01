// So this authentication is required because According to user's POV - user knows its him and that's why he is clicking the logout button but according to server's POV -  anyone can give that request and delete anyone's session , so to avoid that this middleware is used it checks if the user is an authorized user or not and if he/she is allowed to perform that action or not

// From the user’s pov:  “I know it’s me, so I click the logout button.”

// From the server’s pov: “I only see an HTTP request. Anyone on the internet could have sent this.”

// Because of that mismatch, the server must prove identity before allowing the action.
// So the middleware exists to answer one question before the controller runs: “Is this request coming from the same entity that owns the session being destroyed?”
// If yes → allow logout
// If no → reject

const user = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

module.exports.isAuthenicated = async (req,res,next)=>{
    try {
        const authheader = req.headers.authorization;

        if(!authheader || !authheader.startsWith('Bearer')){
            return res.status(401).json({
                success:false,
                message:"Authorization token invalid"
            })
        }

        const token  = authheader.split(" ")[1];

        jwt.verify(token,process.env.JWT_SECRET_KEY, async(error , decoded)=>{
            if(error){
                if(error.name === "TokenExpiredError"){
                    return res.status(401).json({
                        success:false,
                        message:"Access Token has expired, use refreshtoken to generate again"
                    })
                }
                return res.status(400).json({
                    success:false,
                    message:"Access token is missing or invalid"
                })
            }
            // Destructuring and taking out the ID value from the decoded result
            const {id} = decoded;
            const authUser = await user.findById(id);
            
            if(!authUser){
                return res.status(404).json({
                    success:false,
                    message:" User not found" 
            })}
            req.userId = authUser._id;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}