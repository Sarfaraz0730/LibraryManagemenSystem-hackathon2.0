const express = require('express');
const usersModel = require('../../model/usersModel');
const bcrypt = require('bcrypt')
const router = express.Router();


router.post("/",async(req,res,next)=>{
    const data = req.body
    const email = data.email;
    const password = data.password;
    if(!data){
        return res.send("Please enter the username, email and password ")
    }
    try{
        const userExist = await usersModel.findOne({email:email});
        if(userExist){
            return res.status(200).json({message:"User already exist"})
        }
        const hashedPassword =  await bcrypt.hash(password,10);
       
        data.password =hashedPassword
        const response = await usersModel.create(data);
        return res.status(200).json({message:"Registration successful", response:response})

    }catch(err){
      
        return res.status(500).json({ message: "Internal server error while registering user", error: err.message });
    }
    
})

module.exports =router