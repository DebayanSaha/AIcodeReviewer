const express = require('express')
const aiRoutes = require("./routes/ai.route")
const userRoutes = require('./routes/user.routes')
const cors = require("cors")

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())

app.get('/',(req, res)=>{
    res.send("Hello World");
})
app.use('/ai',aiRoutes)
app.use('/user',userRoutes);

module.exports=app;