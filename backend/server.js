require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/database/db.js');
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    connectDB();
    console.log(`Sever is running on port ${PORT}`)
})