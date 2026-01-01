const { required, ref } = require('joi');
const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports= mongoose.model("Session",sessionSchema);

