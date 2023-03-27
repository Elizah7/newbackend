
const express = require("express")
const { userModel } = require("../model/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const app = express()
app.use(express.json())
const userRoutes = express.Router()


userRoutes.post("/login",async(req,res)=>{
    const { email, password } = req.body
    try {
       const alldata = await userModel.find({ email })
       if (alldata.length > 0) {
          const userauth = bcrypt.compareSync(password, alldata[0].password)
          if (userauth) {
             const token = jwt.sign({ course: alldata[0]._id }, "originals")
             req.headers = token
             res.status(200).send(token)
          }
          else {
             res.send("something went wrong")
          }
       }
       else {
          res.send("wrong credentials")
       }
    } catch (error) {
       res.send(error.message)
    }
})
userRoutes.post("/register",async(req,res)=>{
  
            const {email,password,is_married ,gender,name} = req.body
            try {
                const user = await userModel.find({email})
                if(user.length>0){
                    res.send("User already exist, please login")
                }
                try {
                        bcrypt.hash(password, 4, async(err, hash)=> {
                        if(err) throw err
                        const newuser = new userModel({email,password :hash,is_married,gender,name,city,age})
                        await newuser.save()
                        res.send("account has been created")
                    });
                  
                } catch (error) {
                    res.send(error.message)
                }
            } catch (error) {
                res.send(error.message)
            }
          


})




module.exports = {
    userRoutes
}


