const mongoose = require('mongoose');
const {Schema} = mongoose;

const transactionSchema =new Schema({
  memberId:{type:mongoose.Schema.Types.ObjectId, ref:"users",required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'books', required: true },
  issuedDate:{type:Date,required:true, default:Date.now},
  returnDate:{type:Date},
  status:{type:String,default:'issued',required:true},

  returnedDate:{type:Date}

})
module.exports = mongoose.model('Transactions',transactionSchema)