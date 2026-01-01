const yup = require('yup')

const userSchema = yup.object({
    username: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required(),

  email: yup
    .string()
    .email("The email is not a valid one")
    .required(),

  password: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*()<>,."]/, "Password must contain at least one special character")
    .required(),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password and confirm password must be same")
    .required()
})

const validateUser = (schema)=> async (req,res,next)=>{
    try {
        await schema.validate(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ errors: err.errors });
    }
} 

module.exports = {userSchema , validateUser}