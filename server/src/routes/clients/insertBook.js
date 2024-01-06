const express = require('express');
const bookModel = require('../../model/bookModel');
const router = express.Router();

router.post("/",async(req,res,next)=>{
    const data = req.body
    const title = data.title
    if(!data){
        return res.status(400).json({message:"Book Details required Title must required"})
    }
    try{ 
        const bookExist = await bookModel.findOne({title:title})
        if(bookExist){
            return res.status(404).send("Book already exist")
        }
        const insertBooks = await bookModel.create(data)
        
        res.send(insertBooks)
    }catch(err){
        return res.status(500).json({message:"Internal server error", Error:err.message})
    }


})
module.exports = router