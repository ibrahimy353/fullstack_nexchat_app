import { Jwt } from "jsonwebtoken";
// the middleware here verifies the api end points in which it 
//allow the authorized user to be able to do things in which the non loged in user cant access or do

export const verifyToken = async (req, res, next) =>{ 
    try{
        let token = req.header("Authorization");
//if the token entered doesnt exist then the system will give back output Access denaid
//this is done through grabbing token from the front end to back end
        if(!token ){
            return res.status(403).send("Access Denaid");
        }

        if (token.startswith("Bearer ")) {
            token = tooken.slice( 7, token.length).trimLeft()
        }

        const verified = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }  
    catch (err){
        res.status(500).json({error: err.message})
} 
}
    