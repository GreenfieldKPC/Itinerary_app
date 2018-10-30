const mongoose = require('mongoose');

//replace with url from mLab?
mongoose.connect('mongodb://localhost/fetcher');

const userSchema = mongoose.Schema({
    
});

const User = mongoose.model('User', userSchema);

const save = (users) => {
    // This function should save a user profile to
    // the MongoDB database

};

module.exports.User = User;
module.exports.save = save;