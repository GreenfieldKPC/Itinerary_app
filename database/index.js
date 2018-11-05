const mongoose = require('mongoose');
const mLAB_URI = require('../config').mLAB_URI;

mongoose.connect(mLAB_URI, { useNewUrlParser: true });

const userProfileSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
  interests: {
    music: { type: Boolean, lowercase: true },
    business: { type: Boolean, lowercase: true },
    food_drink: { type: Boolean, lowercase: true },
    community: { type: Boolean, lowercase: true },
    arts: { type: Boolean, lowercase: true },
    film_media: { type: Boolean, lowercase: true },
    sports_fitness: { type: Boolean, lowercase: true },
    health: { type: Boolean, lowercase: true },
    science_tech: { type: Boolean, lowercase: true },
    travel_outdoor: { type: Boolean, lowercase: true },
    charity_causes: { type: Boolean, lowercase: true },
    spirituality: { type: Boolean, lowercase: true },
    family_education: { type: Boolean, lowercase: true },
    holiday: { type: Boolean, lowercase: true },
    government: { type: Boolean, lowercase: true },
    fashion: { type: Boolean, lowercase: true },
    home_lifestyle: { type: Boolean, lowercase: true },
    auto_boat_air: { type: Boolean, lowercase: true },
    hobbies: { type: Boolean, lowercase: true },
    school: { type: Boolean, lowercase: true },
    other: { type: Boolean, lowercase: true },
  },
});


const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// save a user profile to database
// accepts object with user's properties
// creates new profile and saves to database
const createUserProfile = (userObj, cb) => {
  console.log(userObj, 'USER OBJ IN DATABASE');
  // check for unique username and email
  // alert user if either is already taken
  const newUser = new UserProfile({
    username: userObj.username,
    email: userObj.email,
    password: userObj.password,
    passwordConf: userObj.passwordConf,
    interests: {
      music: false,
      business: false,
      food_drink: false,
      community: false,
      arts: false,
      film_media: false,
      sports_fitness: false,
      health: false,
      science_tech: false,
      travel_outdoor: false,
      charity_causes: false,
      spirituality: false,
      family_education: false,
      holiday: false,
      government: false,
      fashion: false,
      home_lifestyle: false,
      auto_boat_air: false,
      hobbies: false,
      school_activities: false,
      other: false,
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
const updateInterests = (updateObj, cb) => {
  // update time
  const query = { username: updateObj.username };
  const setObject = {};
  // update interest
  setObject[`interests.${updateObj.interest}`] = true;
  // update timestamp
  setObject.updated_at = Date.now();

  UserProfile.updateOne(query, { $set: setObject }, (err) => {
    if (err) {
      console.error(err);
      cb(err, 'error updating interest');
    } else {
      // profile.updated_at = Date.now();
      // let prop = Object.keys(setObject)[0];
      // console.log(Object.keys(profile.interests), 'bool');
      // profile[Object.keys(setObject)[0]] = !profile[Object.keys(setObject)[0]];
      // profile.save((err) => {
      //     if (err) {
      //         console.error(err, 'error saving updated interest');
      //         cb(err);
      //     }
      // })
    }
  });
};

// update profile function
// accepts username and object with property and value to be updated
// changes value of property on user profile
const updateProfile = (username, propObj, cb) => {
  const query = { username };
  UserProfile.updateOne(query, propObj, (err) => {
    if (err) {
      console.error(err);
      cb(err, 'error updating interest');
    }
  });
};

const getUserInterests = (username, cb) => {
  const interests = [];
  UserProfile.findOne({ username })
    .exec((err, profile) => {
      if (err) {
        console.error(err, 'error getting user interests');
        cb(err);
      } else {
        Object.keys(profile.interests)
          .forEach((key) => {
            if (profile.interests[key] === true) {
              if (key !== '$init') {
                interests.push(key);
              }
            }
          });
      }
      cb(null, interests);
    });
};

const logIn = (user, callback) => {
  const username = user.username;
  const password = user.password;
  UserProfile.find({ username }, (err, docs) => {
    if (err) {
      callback(err, false);
      console.log(err, 'ERROR IN DATABASE LOGIN');
    } else if (!docs.length) {
      callback(null, false);
    } else if (docs[0].password === password) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
};

module.exports.logIn = logIn;
module.exports.UserProfile = UserProfile;
module.exports.createUserProfile = createUserProfile;
module.exports.updateInterests = updateInterests;
module.exports.updateProfile = updateProfile;
module.exports.getUserInterests = getUserInterests;
