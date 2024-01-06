const express = require('express');
const router = express.Router()
const signup = require("./clients/signup")
const login = require('./clients/login')
const librarianProfile = require('./clients/librarianProfile')
router.use("/singup",signup)
router.use("/login", login)
router.use("/librarianProfile",librarianProfile)
module.exports = router