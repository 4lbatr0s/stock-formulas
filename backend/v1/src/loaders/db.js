import Mongoose from "mongoose";

const db = Mongoose.connection;

db.once("open", ()=>{
    console.log("Successfully connected to mongodb");
})


const connectDB =  async () => {
    console.log(process.env.DB_HOST,process.env.DB_PORT, process.env.DB_NAME )
    await Mongoose.connect(`mongodb+srv://serhat:jXgcx2Mu1r3ojLww@cluster0.9jvil.mongodb.net/zufindb`, {
        useNewUrlParser:true, //tells mongoose to use the latest url parser.
        useUnifiedTopology:true //tells mongoose to use the newest server discovery and monitoring engine
    });     
}

export {connectDB} 


