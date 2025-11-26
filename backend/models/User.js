const mogoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
        name: String,
        email: String,
        password: String,
        profileImage: String,
        bio: String,
    },
    {
        timesTamps: true,
    }
);

const User = mongoose.mode("User", userDchema)

module.exports = User;