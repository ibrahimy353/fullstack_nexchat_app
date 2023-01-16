import Post from "../models/Post.js";
import User from "../models/User.js";


/*CREATE*/
export const createPost = async (req, res)=>{ // the async gets to handle the function that we created in the index.js and not past the middleware
    try{
        const { userId, description, picturePath } = req.body;// sent from the front end
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();

        const port = await Post.find();
        res.status(409).json({message: err.message})

    }catch (err) {
        res.status(409).json({message: err.message})
    }
};

            /*READ*/ 
// this represents the newsfeed shown in the user screen
export const getFeedPost = async (req, res) =>{
    try{
        const post = await Post.find();
        res.status(200).json(post);// code 200 is a successfull message

    }catch (err) {
        res.status(404).json({message: err.message})
    }
};

export const getUserPost = async (req, res) =>{
    try{
        const {userId} = req.params;
        const post = await Post.find({ userId});
        res.status(200).json(post);

    }catch (err) {
        res.status(404).json({message: err.message})
    }
};

/*UPDATE */

export const likePost = async ( req, res) =>{
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);//grabs the post info
        const isLiked = post.likes.get(userId);// what this does is check if the userid does exist and is liked by  that particular person

        if (isLiked){ 
            post.likes.delete(userId);    
        } else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}

        );

        res.status(200).json(updatedPost);

    }catch (err) {
        res.status(404).json({message: err.message})
    }
};