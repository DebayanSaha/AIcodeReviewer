const express = require('express')
const aiRoutes = require("./routes/ai.route")
const userRoutes = require('./routes/user.routes')
const cors = require("cors")

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://revi-8xun.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json())

app.get('/',(req, res)=>{
    res.send("Hello World");
})
app.use('/ai',aiRoutes)
app.use('/user',userRoutes);

module.exports=app;