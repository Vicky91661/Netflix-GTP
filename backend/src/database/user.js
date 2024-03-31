const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://vicky:v8797572731@cluster0.ufffkaf.mongodb.net/netflixGPT')
  .then(() => console.log('Connected!'));
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }

})
const User = mongoose.model("User",userSchema)
module.exports = {User};