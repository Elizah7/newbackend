const express = require("express")
const { connection } = require("mongoose")
const { authentication } = require("./middelwares/auth")
const { postRoutes } = require("./routes/postroutes")
const { userRoutes } = require("./routes/userroutes")


const app = express()
require("dotenv").config()
app.use(express.json())
app.use("/users",userRoutes)
// app.use(authentication)
app.use("/posts",postRoutes)


app.listen(process.env.port,async()=>{

    try {
       await connection
       console.log("connected to mogodb")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is runnig")
})