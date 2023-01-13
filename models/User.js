import mongoose from "mongoose";

const UserSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        email: {
            type: String,
            required: true,
            max: 50,
            unique: true, /* meaning u cannot have duplicate emails it has to be unique */
        },
 
        password: {
            type: String,
            required: true,
            min: 5,
        },

        picturePath: {
            type: String,
            default: "",

        },

        friends: {
            type: String,
            default:"",

        },

        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,

    }, 
    { timestamps: true} /* this gives us automatic time frames in which the new user data was fed into the system */
);

const User = mongoose.model("User", UserSchema);
export default User;