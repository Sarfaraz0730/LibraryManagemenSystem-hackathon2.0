const express = require('express');
const router = express.Router()
const signup = require("./clients/signup")
const login = require('./clients/login')
const librarianProfile = require('./clients/librarianProfile')
const insertbook = require('./clients/insertBook')
const updateBook = require("./clients/updateBook")
const getBooks = require("./clients/getBooks")
const deleteBook = require("./clients/deleteBook")
const searchBook = require("./clients/searchBook")
const bookIssued = require("./clients/bookIssued")
const bookReturned = require('./clients/bookReturned')
router.use("/singup",signup)
router.use("/login", login)
router.use("/librarianProfile",librarianProfile)
router.use("/insertbook", insertbook)
router.use("/updateBook",updateBook)
router.use("/getBooks",getBooks)
router.use("/deleteBook", deleteBook)
router.use("/searchBook", searchBook)
router.use("/bookIssued",bookIssued)
router.use("/bookReturned",bookReturned)
module.exports = router