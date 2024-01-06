const express = require('express');
const bookModel = require('../../model/bookModel');
const router = express.Router();

router.get("/", async(req,res,next)=>{
    try{
         const getBooksDetails = await bookModel.find()
         return res.send(getBooksDetails)
    }catch(err){
        return res.status(500).json({message:"Internal server error", error:err.message})
    }
})
module.exports = router