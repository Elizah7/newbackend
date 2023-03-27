


const jwt = require("jsonwebtoken")
const authentication =  (req, res, next) => {
   const token = req.headers.authorization
   if (token) {
      const decoded = jwt.verify(token, "originals")
      if (decoded) {
         req.body.userId = decoded._id
         next()
      }
      else {
         res.send("Login First")
      }
   }
   else {
      res.send("Login First")
   }
}

module.exports = { authentication }