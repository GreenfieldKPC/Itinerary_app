const mongoose = require('mongoose');

//replace with url from mLab?
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });

const userProfileSchema = mongoose.Schema({
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
    interests: {
        cocktails: { type: Boolean, lowercase: true, },
        pizza: { type: Boolean, lowercase: true, },
        outdors: { type: Boolean, lowercase: true, },
        jazz: { type: Boolean, lowercase: true, },
        festivals: { type: Boolean, lowercase: true, },
        shopping: { type: Boolean, lowercase: true, },
    },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// save a user profile to database
// accepts object with user's properties
// creates new profile and saves to database
const createUserProfile = (userObj, cb) => {
    // check for unique username and email
    // alert user if either is already taken
    const newUser = new UserProfile({
        username: userObj.username,
        email: userObj.email,
        password: userObj.password,
        passwordConf: userObj.passwordConf,
        created_at: Date.now(),
        updated_at: null,
        interests: {
            cocktails: false,
            pizza: false,
            outdoors: false,
            jazz: false,
            festivals: false,
            shopping: false,
        },
    });
    // save new profile 
    newUser.save((error) => {
        if (error) { 
            console.error(error, 'error saving new profile'); 
            cb(error);
        }
    });

};

// update interests function
// accepts username and interest to be updated
// changes boolean value of interest on user profile
const updateInterests = (username, interest) => {

};

// update profile function
// accepts username and object with property and value to be updated
// changes value of property on user profile
const updateProfile = (username, propObj) => {

};


module.exports.UserProfile = UserProfile;
module.exports.createUserProfile = createUserProfile;