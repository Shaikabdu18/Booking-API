const jwt = require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
  const token = req.header("Authorization")
  if(!token) return res.status(400).json("Acess Denied")
  try{
      const verify = jwt.verify(token,process.env.JWT)
      // console.log(verify)
      // console.log(req.user)
      req.user = verify
      next()
  }
  catch(err){
    res.status(500).json(err)
  }
}
module.exports = verifyToken