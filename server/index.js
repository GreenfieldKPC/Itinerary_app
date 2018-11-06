const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index'); // needs to require towards the database
const handler = require('../requesthandler/yelp.js'); // this helper get the information from the yelp api
const util = require('../requesthandler/utility.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'its a secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(express.static(path.join(__dirname, '/../client'))); // path to the front end


// LOGIN
app.post('/login', (req, res) => {
  req.on('data', (chunk) => {
    const user = JSON.parse(chunk);
    console.log(user);
    db.logIn(user, (err, bool) => {
      console.log(bool, 'boolean');
      if (err) {
        console.log(err);
        res.send(false);
      } else if (bool) {
        console.log('LOGGED IN');

        // create session and redirect
        util.createSession(req, res, user.username);
        // res.redirect('/');
      } else {
        console.log('NOT A USER');
        res.sendStatus(404);
      }
    });
  });
});

// SIGN UP
app.post('/signup', (req, res) => {
  req.on('data', (chunk) => {
    const userObj = JSON.parse(chunk);
    console.log(userObj, 'gothere');
    db.createUserProfile(userObj, (err) => {
      if (err) {
        // notify user of error
        console.error(err, 'error signing up');
      }
    });
  });
  res.end();
});

// update user interests
// req.body needs username and interest with value of interest that was clicked
app.patch('/interests', (req, res) => {
  db.updateInterests(req.body, (err) => {
    if (err) {
      // notify user of error
      console.error(err, 'error updating interest');
    }
  });
  res.end();
});

// get user interests
// query database by username, receive array of interests
app.get('/interests', (req, res) => {
  console.log('triggered');
  db.getUserInterests(req.query.username, (err, interests) => {
    if (err) {
      // notify user of error
      console.error(err, 'error getting interests');
      res.send(err);
    } else {
      console.log(interests, 'interests');
      // return array of interests
      res.send(JSON.stringify({ interests }));
    }
  });
});

// update user profile
// req.body needs username and update object with property and new value
app.patch('/profile', (req, res) => {
  db.updateProfile(req.body.username, req.body.update, (err) => {
    if (err) {
      // notify user of error
      console.error(err, 'error updating profile');
    }
  });
  res.end();
});

// endpoint for deleting account
// app.delete('/delete')

// YELP SEARCH
app.get('/loc/:locationID', (req, res) => {
  const location = req.path.slice(5);

  handler.getTopRestaurants(location, (err, result) => {
    if (err) {
      console.log(err, 'ERROR IN SERVER');
    } else {
      console.log(result.body);
      // sort by interests??????
      res.send(JSON.stringify(result.body));
    }
  });
});

// EVENT SEARCH
app.get('/event/:locationId', (req, res) => {
  const location = req.path.slice(5);
  handler.getEvent(location, (err, result) => {
    if (err) {
      console.log(err, 'events');
    } else {
      // console.log(result.body);
      res.send(JSON.stringify(result.body));
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
