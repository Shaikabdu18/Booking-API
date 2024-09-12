const User = require("../models/User")
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")

//register user
exports.registerUser = async(req,res) =>{
  let {username,email,password} = req.body;
  email = email.toLowerCase()
  try {
    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).send("User Already Exists")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = new User({
      username,
      email :email.toLowerCase(),
      password:hashedPassword
    })
    await user.save();
    return res.status(201).send("User Registered Sucessfully")
  } catch (error) {
    return res.status(500).send("Server error:",error)
  }
}
//Login user
exports.loginUser = async(req,res)=>{
 let {email,password} = req.body;
 email = email.toLowerCase()
  try {
    const user = await User.findOne({email})
    if(!user) return res.status(400).send("User not exists")
      const match = bcrypt.compare(password,user.password)
    if(!match) return res.status(400).send("invalid Password")
    const token = jwt.sign({id:user.id,role:user.role},process.env.JWT,{expiresIn:"8h"})
      res.json({token})
  } catch (error) {
    res.status(500).send("server error:",error)
  }
}