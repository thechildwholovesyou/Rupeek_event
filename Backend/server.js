const express=require('express');
const app=express();
require('dotenv').config({path:'./process/config.env'});
const cors=require('cors');     //Cross-Origin Resource Sharing
const morgan=require('morgan');     // HTTP request level Middleware(logging)


app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(morgan());

require('./db/conn');

app.use('/api/interest',require('./routes/interest'));
app.use('/api/user',require('./routes/user'));

const port=process.env.PORT||8000;

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})