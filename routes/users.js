import { Express } from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriends,
} from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ FROM cRud*/
router.get(":/id", verifyToken, getUser);// if the user is sending a particular id (syntax), the system can grab the id from the database to give a specif output
router.get(":/id/friends", verifyToken, getUserFriends);

/*UPDATE from crUd*/
router.patch(":/id/friendId", verifyToken, addRemoveFriends);
export default router;