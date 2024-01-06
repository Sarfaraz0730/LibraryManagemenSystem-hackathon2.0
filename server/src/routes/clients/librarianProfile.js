const express = require('express');
const verify = require('../../helper/jwt');
const router = express.Router();

router.get("/",verify,async(req,res,next)=>{
    res.send("Librarian Profile")
})

module.exports =router