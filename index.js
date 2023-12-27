import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import UserRoute from "./routes/UserRoute.js"
import env from "dotenv"
import connection from "./db/db.js"

const app = express();

app.use(cors())
app.use(express.json())

app.use(UserRoute)

// const port = process.env.PORT||5000;
app.listen(5000, ()=>{
    console.log(`listen up on port 5000`);
})