import mongoose from "mongoose"
// import dotenv from "dotenv"
// dotenv.config({path:'./.env'});

mongoose.connect("mongodb://localhost:27017/sosmed",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
try {
    db.once("open", () => console.log("db connected"));
} catch (error) {
    db.on("error", (err)=> console.log(err))    
}

export default db;