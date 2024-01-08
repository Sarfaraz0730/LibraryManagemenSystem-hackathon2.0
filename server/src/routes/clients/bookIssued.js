const express = require('express');
const verify = require('../../helper/jwt');
const usersModel = require('../../model/usersModel');
const bookModel = require('../../model/bookModel');
const TransactionModel = require('../../model/TransactionModel');
const router = express.Router();

router.post("/",async(req,res,next)=>{
    const decoded = req.decoded;
    const data = req.body
    const memberId=data.memberId

    const bookId =data.bookId
    console.log("TransactionData",data)

    // if(!decoded){
    //     return res.status(401).json({message:"this user is not verified for issuing the Books, token is required "})
    // }
    if(!memberId){
        return res.status(401).json("Member id is required to issued the books, the student is not registered,else show the member id /userid ")
    }
    if(!bookId){
        return res.status(404).send("Book id is required")
    }
    try{
        const memberDetails = await usersModel.findOne({_id:memberId})
        const bookDetails = await bookModel.findOne({_id:bookId})
        console.log("bookDetails ",bookDetails)
        if(!memberDetails){
            return res.status(401).send("This user do not exist in this College so I cannot issue him/her book")
        }
        if(!bookDetails || bookDetails.copies_available===0){
            return res.status(404).send("Book not available for issuance.")
        }

        const transactionDetails ={
            memberId:memberId,
            bookId:bookId,
            issuedDate:data.issuedDate,
            returnDate:data.returnDate,
            status:data.status,
            returnedDate:data.returnedDate

        }
        const transact = await TransactionModel.create(transactionDetails);
        if(!transact){
            return res.status(404).send("while issuing book something went wrong")
        }
        bookDetails.copies_available -=1;
        const updateBookModel = await bookDetails.save()
        console.log("updateBookModel",updateBookModel)




        return res.send({bookDetails:bookDetails,memberDetails:memberDetails,transact:transact})
    }catch(err){
        return res.status(500).json({message:"internal server error ", err:err.message})
    }
})

module.exports = router