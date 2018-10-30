const mongoose = require('mongoose');

//replace with url from mLab?
mongoose.connect('mongodb://localhost/fetcher');

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
    interests: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

const User = mongoose.model('User', userSchema);

const save = (users) => {
    // This function should save a user profile to
    // the MongoDB database

};

module.exports.User = User;
module.exports.save = save;