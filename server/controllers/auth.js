import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/UserM.js'

//REGISTER
export const register = async(req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password,salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password :passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewesProfile:Math.floor(Math.random()*10000) ,
            impression: Math.floor(Math.random()*10000),
        })

        const savedUser = await newUser.save()
        res.status(201).json({message:"User Created",savedUser})

    } catch (error) {
        res.status(500).json({message:"Somthing wron",error})
    }
}

//LOG IN
export const login =async (req,res)=>{
    try {

        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({message:"User Not Found"})

        const isMatch = bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:"Invalid Creadintials"})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        delete user.password
        
        res.status(200).json({message:"User Loged In",user,token})
        
    } catch (error) {
        res.status(500).json({message:"Somthing wron",error})
    }
}
