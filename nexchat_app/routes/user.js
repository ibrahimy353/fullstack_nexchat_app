import express  from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ from cRud*/
router.get(":/id", verifyToken, getUser);// if the user is sending a particular id (syntax), the system can grab the id from the database to give a specif output
router.get(":/id/friends", verifyToken, getUserFriends);

/*UPDATE from crUd*/
router.patch(":/id/friendId", verifyToken, addRemoveFriend);
export default router;