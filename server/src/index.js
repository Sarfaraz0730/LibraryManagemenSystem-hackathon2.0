const express = require("express");
const app = express();
const cors = require('cors')
const connectDatabase = require("./database/db")
const PORT = 8000;
const router = require("./routes/index")

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Replace with the actual origin of your HTML file
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());
app.use(router)

connectDatabase()

app.listen(PORT,()=>{
console.log(`server is listening on ${PORT}`)
})