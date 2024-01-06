const express = require("express");
const app = express();
const cors = require('cors')
const connectDatabase = require("./database/db")
const PORT = 8000;
const router = require("./routes/index")

app.use(cors())
app.use(express.json());
app.use(router)

connectDatabase()

app.listen(PORT,()=>{
console.log(`server is listening on ${PORT}`)
})