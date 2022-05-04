const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const ErrorMiddleWare = require('./MiddleWare/Error');
const cors = require('cors');
dotenv.config({path:"./Config/Config.env"});

// HANDLING UNCAUGHT EXCEPTION
process.on('uncaughtException',(err) => {

    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);

})



const app = express();

const Router = require('./Router/Route');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/',Router);

app.use(ErrorMiddleWare);

const Server = mongoose.connect(process.env.DB_URL)
.then(res => {
    
    app.listen(process.env.PORT, () => {
        console.log(`server has started ${process.env.PORT}`)
    });
})

// UN-HANDLE PROMISE REJECTIONS
process.on("unhandledRejection",err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unHandle promise rejection`);
    Server.close(()=>{
        process.exit(1);
    })
});