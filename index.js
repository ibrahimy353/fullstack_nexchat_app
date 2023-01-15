import express from "express";
import bodyParser  from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import{register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import { verify } from "crypto";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users } from "./data/index.js"
import { posts } from "./data/index.js";
/* Configuration */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true }));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true }));
app.use (cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assests')));  
/*what this statement does is it shows where the assets/images are stored which is localy */

/*FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function( req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/*ROUTERS WITH FILES */
app.post("/auth/register", upload.single("picture"), register);// the line here grabs the image property from the frontend user where the image is actually located through the http call
app.post("/posts", verifyToken, upload.single("picture"),createPost);// this line then ensures that the system grabs it

/*ROUTES*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*MONGOOSE SETUP */
const PORT = process.env.PORT|| 6001;
mongoose
.connect (process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
      
 /*ADD THE DATA ONE TIME*/
  user.insertMany(users);
    //Post.insertMany(posts);
})

.catch((error) => console.log(`${error} did not connect`));