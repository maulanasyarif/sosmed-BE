import express from "express"
import db from "./db/db.js"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import cors from "cors"
import UserRoute from "./routes/user.routes.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({path:'./.env'});

// mongoose.connect("mongodb://localhost:27017/sosmed",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// const db = mongoose.connection
// try {
//     db.once("open", () => console.log("db connected"));
// } catch (error) {
//     db.on("error", (err)=> console.log(err))    
// }

const app = express();
app.use(cors())
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    const token = req.headers.authorization
    if (req.headers && req.headers.authorization && token.split(' ')[0] === 'JWT') {
        jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, function(err, decode) {
        if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use(UserRoute)
app.listen(process.env.PORT, ()=>{
    console.log(`listen up on port 5000`);
})