//IMPORTS
import express  from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv'
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import { fileURLToPath } from "url";
import mongoose from "mongoose";


import User from "./models/UserM.js";
import Post from './models/PostM.js'
// import { users,posts } from './data/index.js'


//IMPORTS ROUTES
import { register } from "./controllers/auth.js";
import  {createPost}  from "./controllers/postsC.js";
import authRoutes from './routes/AuthRoutes.js'
import { veryFyToken } from "./middleware/AuthMiddleware.js";
import usersRouts from './routes/users.js'
import postsRouts from './routes/postRoutes.js'



// CONFIGARATION
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()


// MIDDLEWEARE
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname, "public/assets")))



//FILE STORAGE
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"public/assets")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage})


//Routes with files
app.post('/auth/register',upload.single("picture"),register)
app.post('/posts',veryFyToken,upload.single("picture"),createPost)



//ROUTES
app.use('/auth',authRoutes)
app.use('/users',usersRouts)
app.use('/posts',postsRouts)



//MONGOOSE SETUP
const PORT = process.env.SERVER_PORT || 6001
const DB = process.env.MONGO_URL

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Everything is running on port : ${PORT}`))
    /* ADD DATA ONE TIME */
    // User.insertMany(users)
    // Post.insertMany(posts)

}).catch((err)=>{
    console.log(` ${err} Did'n connect `)
})