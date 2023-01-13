import { json } from "body-parser";
import bcrypt from  "bcrypt";
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
        /*what this does is it creates an environment which when the user sets up their password it wont be expossed */
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()* 10000),
            impressions: Math.floor(Math.random()*10000)

        });
    
    /*this right here ensures that when the user sets in a request to login they get back the exact correst data from the backend*/
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); 
        /*response provided in json format by using express in
         backend to provide the user the correct details if the authentication provied is correct or doesn't error out */
    } catch (err){
        res.status(500).json({error: err.message});
        //in casses of error or wrong auth this what the user will get in the frontend
        

    }
};