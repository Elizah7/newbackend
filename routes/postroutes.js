
const express = require("express")
const { postModel } = require("../model/postmodel")

const app = express()

const postRoutes = express.Router()
app.use(express.json())


postRoutes.get("/",async(req,res)=>{
        
     try {
         const getdata = await postModel.find()
         res.status(200).send(getdata)
     } catch (error) {
        res.send(error.message)
     }
})
postRoutes.post("/add",async(req,res)=>{
       try {
            const newdata = new postModel(req.body)
            await newdata.save()
            res.status(200).send("post has been added")
       } catch (error) {
            res.send(error.message)
       }
})
postRoutes.patch("/update",async(req,res)=>{
    const id = req.params.id
    try {
        const newdata = await  postModel.findByIdAndUpdate(id,req.body)
        res.status(200).send("data  has been updated")
   } catch (error) {
        res.send(error.message)
   }
})
postRoutes.delete("/delete",async(req,res)=>{
    const id = req.body.params
    try {
        const newdata = await postModel.findByIdAndDelete(id,req.body)
        res.status(200).send("data  has been deleted")
   } catch (error) {
        res.send(error.message)
   }
})


module.exports = {
    postRoutes
}


