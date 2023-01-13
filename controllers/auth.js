import bcrypt from  "brycpt";
import { Jwt } from "jsonwebtoken";
import user from "../models/User.js";

/*REGISTER USER */

export const register = async (req, res) => { /* the async creates a connection between mongodb backend and the frontend when user request for data */
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body; /*request body*/
         
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,

        })
    } catch (err){

    }
}