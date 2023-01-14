import User from "../models/User";

/*READ*/

export const getUser = async (req, res) =>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);//here the db grabs the user id
        res.status(200).json(user);

    }  catch (err){
        res.status(404).json({error: err.message});
    }
};

export const getUserFriends =  async(req, res) =>{

// this grabs all the user friends from the id u specify
try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.localeCompare((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({_id, firstName, lastName, occupation, location, picturePath}) => {
        return { _id, firstName, lastName, occupation, location, picturePath};
    }
    );
    res. status(404).json(formattedFriends);
} catch(err){
    res.status(404).json({message: err.message})
}
};
 
/*UPDATE*/

export const addRemoveFriend = async( req, res) =>{
    try{
        const {id, FriendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            //if the friend id is part of the main friends user id list we remove them through using the line bellow.
            //the filter function removes the friends id if the user id is equal as the user
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friends.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.localeCompare((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
            return { _id, firstName, lastName, occupation, location, picturePath};
        }
        );

        res.status(200).json(formattedFriends);

    }  catch(err){
    res.status(404).json({message: err.message})
}
} 



