const express = require("express")
const cors = require('cors');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const {User}  = require("../src/database/user.js");

const app = express();

const PORT = 3000;
const jwt_secret_key = "vicky"
const saltRounds = 10;

app.use(cors())
app.use(express.json())

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const isSignin = req.body.isSignin;
    if(isSignin){
        try {
            const user = await User.findOne({email});
            if(user){
                const isValidPassword =await bcrypt.compare(password, user.password)
                if(isValidPassword){
                    var token = jwt.sign({ email }, jwt_secret_key);
                    return res.status(200).json({
                        message:"success",
                        name:user.name,
                        email:user.email,
                        token
                    })
                }else{
                    return res.status(404).json({
                        message:"Incorrect Password"
                    })
                }
            }else{
                return res.status(404).json({
                    message:"Invalid User"
                })
            }
        } catch (error) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        
    }else{
        try {
            const name = req.body.name;
            const hashValue = await bcrypt.hash(password,saltRounds);
            const user = await User.findOne({email});
            if(user){
                return res.status(404).json({
                    message:"Already a User"
                })
            }else{
                const createdUser = await User.create({
                    name:name,
                    email:email,
                    password:hashValue
                })
                if(createdUser){
                    var token = jwt.sign({ email }, jwt_secret_key);
                    return res.status(200).json({
                        message:"user created",
                        name:createdUser.name,
                        token,
                        email:createdUser.email
                    })
                }else{
                    return res.status(404).json({
                        message:"user not created"
                    })
                }
               
            }
        } catch (error) {
            console.log("Error:", error);
            return res.status(400).json({ message: "Something went wrong" });
        }

    }
    
    // try {
    //     bcrypt.hash(password, saltRounds).then(async function (hash) {
    //         // Store hash in your password DB.
    //         console.log(hash)
    //         User.findOne({ email }).then((user) => {
    //             console.log("user is ",user)
    //             if (user) {
    //                 console.log("User found:", user);
    //                 var token = jwt.sign({ email }, jwt_secret_key);
    //                 return res.status(200).json({
    //                     token,
    //                     message: "success",
    //                     name: user.name
    //                 });
    //             } else {
    //                 console.log("User not found");
    //                 return res.status(404).json({ message: "User not found" });
    //             }
    //         }).catch((error) => {
    //             console.log("Error while finding user:", error);
    //             return res.status(500).json({ message: "Internal server error" });
    //         });
    //     }).catch((error) => {
    //         console.log("Error while hashing password:", error);
    //         return res.status(500).json({ message: "Internal server error" });
    //     });
    // } catch (error) {
    //     console.log("Error:", error);
    //     return res.status(400).json({ message: "Something went wrong" });
    // }

   
})

app.listen(PORT,()=>{
    console.log("listning at ",PORT)
})