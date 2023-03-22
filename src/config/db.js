const mongoose=require('mongoose');
// mongoose.set('strictquery',false);

mongoose.connect("mongodb://localhost:27017/finalAssesment",{
   useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("db connected sucessfully");
})
.catch(()=>{
    console.log("db is not connected");
})