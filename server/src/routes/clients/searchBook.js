const express = require('express');
const usersModel = require('../../model/usersModel');
const bookModel = require('../../model/bookModel');
const router = express.Router();

router.get("/",async(req,res,next)=>{
    const data= req.body
    const searchByTitle  = data.title
 
    const  searchByAuthor =data.author
    console.log("title, author",searchByTitle, searchByAuthor)
   
    try{
      if((!searchByTitle) ){
        return res.status(404).send("please provide Title  ")

      }
    let query = {}
    if(searchByTitle){
        query.title = {$regex:new RegExp(searchByTitle,'i')}
        const searchResults = await bookModel.find({title:query.title});
        if(searchResults){

            return res.status(200).json(searchResults);
        }else{
            return res.status(200).json({message:`No book found by this  ${searchByTitle}`})
        }

    }else{
        return res.status(200).json({message:`please provide title ${searchByTitle}`})
    }
   
    

    }catch(err){
        return res.status(500).json({message:"internal server error", err:err.message})
    }

})

module.exports = router