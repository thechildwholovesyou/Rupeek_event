const mongoose = require('mongoose')
const db = "mongodb://localhost:27017"

// mongoose returns a promise
mongoose.connect(db, {useNewUrlParser: true})
.then(()=>console.log("DB Connected!"))
.catch((err)=>console.log(err));
