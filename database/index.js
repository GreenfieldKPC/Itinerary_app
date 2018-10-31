const mongoose = require('mongoose');

//replace with url from mLab?
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true }
);

const userSchema = mongoose.Schema({
    type: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    },
    created_at: Date,
    updated_at: Date,
    
    // how to store multiple interests?

    // interests: {
    //     type: String,
    //     unique: true,
    //     required: true,
    //     trim: true
    // },
    // interests: [
    //     { type: mongoose.Schema.ObjectId, ref: 'UserInterests' }
    // ]
});

// const User = mongoose.model('User', userSchema);

// const createAndSaveUser = (users) => {
//     // This function should save a user profile to
//     // the MongoDB database

// };
// update profile function
// update interests function
// schema for user itenerary?


// module.exports.User = User;
// module.exports.createAndSaveUser = createAndSaveUser;