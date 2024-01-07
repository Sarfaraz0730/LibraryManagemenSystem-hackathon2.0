// const express = require('express');
// const bookModel = require('../../model/bookModel');
// const TransactionModel = require('../../model/TransactionModel');
// const router = express.Router();


// router.post("/",async(req,res,next)=>{
//     const returnedBooksDetails = req.body;
//     console.log("returnedBooksDetails ",returnedBooksDetails);
//     const returnedBooksDetailsBookId =returnedBooksDetails.bookId;
//     const memberId =returnedBooksDetails.memberId;
//     if(!returnedBooksDetailsBookId){
//         return res.status(401).send("BookId is required to return the book")
//     }
//     if(!memberId){
//         return res.status(401).send("memberId is required to return the book")

//     }

//     try{
       

//         const transactDetails = await TransactionModel.findOne({memberId:memberId,bookId:returnedBooksDetailsBookId,status: 'issued'})
//         if (!transactDetails) {
//             return res.status(404).json({ error: true, message: "No active transaction found. The book may not be issued to the member." });
//         }
//         console.log("transactDetails",transactDetails)
//         transactDetails.status = 'returned';
//         transactDetails.returnedDate = new Date();
//         await transactDetails.save();


//         return res.status(200).json({
//             success: true,
//             message: "Book returned successfully.",
//             transactionDetails: transactDetails,
//             bookDetails: getBookDetails
//         });
//     }catch(err){
//         return res.status(500).json({message:"Internal server error",error:err.message})
//     }

// })
// module.exports = router



// chatgpt code 


const express = require('express');
const bookModel = require('../../model/bookModel');
const TransactionModel = require('../../model/TransactionModel');
const router = express.Router();

router.post("/", async (req, res, next) => {
    const returnedBooksDetails = req.body;
    console.log("returnedBooksDetails ", returnedBooksDetails);
    const returnedBooksDetailsBookId = returnedBooksDetails.bookId;
    const memberId = returnedBooksDetails.memberId;

    if (!returnedBooksDetailsBookId) {
        return res.status(401).send("BookId is required to return the book");
    }

    if (!memberId) {
        return res.status(401).send("memberId is required to return the book");
    }

    try {
        const transactDetails = await TransactionModel.findOne({
            memberId: memberId,
            bookId: returnedBooksDetailsBookId,
            status: 'issued'
        });

        if (!transactDetails) {
            return res.status(404).json({ error: true, message: "No active transaction found. The book may not be issued to the member." });
        }

        // Check if the book has already been returned
        if (transactDetails.status === 'returned') {
            return res.status(200).json({
                success: true,
                message: "Book already returned.",
                transactionDetails: transactDetails
            });
        }

        // Fetch the book details before updating the transaction status
        const getBookDetails = await bookModel.findOne({ _id: returnedBooksDetailsBookId });

        transactDetails.status = 'returned';
        transactDetails.returnedDate = new Date();
        await transactDetails.save();

        // Increase copies_available only if the book was not already returned
        if (getBookDetails && transactDetails.status === 'returned') {
            getBookDetails.copies_available += 1;
            await getBookDetails.save();
        }

        return res.status(200).json({
            success: true,
            message: "Book returned successfully.",
            transactionDetails: transactDetails,
            bookDetails: getBookDetails
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

module.exports = router;
