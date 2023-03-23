const mongoose=require('mongoose');
// mongoose.set('strictquery',false);

mongoose.connect("mongodb+srv://gaurav12:Gaurav12@cluster0.wx2cuxc.mongodb.net/finalAssesment",{
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
