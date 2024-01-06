const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const usersModel = require('../../model/usersModel');
require('dotenv').config();


const router = express.Router();

router.post("/", async(req,res,next)=>{
   
    const{email,password}= req.body;
    console.log(email, password)

    if(!email){
        return res.status(400).send("Email is required")
    }
    if(!password){
        return res.status(400).send("Password is required")
    }
    try{
        const userDeatils = await usersModel.findOne({email:email})
        if(!userDeatils){
            return res.status(404).json({message:"You have not registered yet"})
        }
        console.log("userDeatils :",userDeatils)
        const payload ={
            _id:userDeatils._id,
            email:userDeatils.email,
            username:userDeatils.username
        }
       const userPassword = userDeatils.password;

        const comparePassword = await bcrypt.compare(password, userPassword);
        if(comparePassword){
            const token = jwt.sign(payload,process.env.SECRET_KEY);
            console.log("token :", token)
            return res.status(200).json({message:"Login successful",token:token})
        }else {
           
            console.log("Invalid password");
            return res.status(401).json({ message: "Invalid password" });
        }

      

    }catch(err){
        return res.status(500).json({message:"Internal server error while login ..",error: err.message})
    }

   
})

module.exports = router