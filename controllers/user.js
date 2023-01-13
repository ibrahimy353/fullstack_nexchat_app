import User from "../models/User";

/*READ*/

export const getUser = async (req, res) =>{
    try{
        const { id } = req.params;

    }  catch (err){
        res.status(404).json({error: err.message});
}
}