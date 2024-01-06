const express = require('express');
const bookModel = require('../../model/bookModel');
const router = express.Router();

router.patch("/:id",async(req,res,next)=>{
    const bookId = req.params.id;
    const data = req.body
    const{title, author,genre,publication_year,copies_available}= data

    if(!bookId){
        return res.status(404).json({message:"bookId is required to update the books details"})
    }
    try{
        const findBookDetails = await bookModel.findByIdAndUpdate({_id:bookId},{title, author,genre,publication_year,copies_available})
        return res.send(bookId)
    }catch(err){
        return res.status(500).json({message:"internal server error", Error:err.message})
    }
})


module.exports = router