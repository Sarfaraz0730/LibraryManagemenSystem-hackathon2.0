const express = require("express");
const bookModel = require("../../model/bookModel");
const router = express.Router();

router.delete("/:id", async(req,res,next)=>{
    const bookId = req.params.id;
    console.log("bookId",bookId)
    if(!bookId){
        return res.status(404).json({message:"book is not provide so, you cannot delete the book"})
    }
    try{
        const deleteBook = await bookModel.findByIdAndDelete(bookId)
        return res.status(200).json({message:"Book is deleted"})

    }catch(err){
        return res.status(500).json({message:"internal server error", error:err.message})
    }
    res.send(bookId)
})

module.exports = router