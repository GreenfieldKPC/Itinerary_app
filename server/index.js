const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database/index'); // needs to require towards the database


const handler = require('../requesthandler/yelp.js'); // this helper get the information from the yelp api
const util = require('../requesthandler/utility.js');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client')));  // path to the front end

// endpoints for views
// app.get('/')
// app.get('/search')
// app.get('/profile')


// add user profile to database
//req.body needs username, email, password, passwordConf (short for password confirmation)
app.post('/signup', (req, res) => {
    db.createUserProfile(req.body, (err) => {
        if (err) {
            // notify user of error
            console.error(err, 'error signing up');
        }
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
    db.getUserInterests(req.query.username, (err, interests) => {
        if (err) {
            // notify user of error
            console.error(err, 'error getting interests');
            res.send(err);
        } else {
            // return array of interests
            res.send(interests);
        }
    });
});

//update user profile
// req.body needs username and update object with property and new value
app.patch('/profile', (req, res) => {
    db.updateProfile(req.body.username, req.body.update, (err) => {
        if (err) {
            // notify user of error
            console.error(err, 'error updating profile');
        }
    });
    res.end();
})

// app.get('/', (req, res) => {
//   res.status(200).send(index.js);

// });

app.get('/loc/:locationID', (req, res) => {
  const location = req.path.slice(5);
//   console.log(location, "LOCATION");
  handler.getTopRestaurants(location, (err, result) => {
    if (err) {
   console.log(err, 'ERROR IN SERVER');
    } else {
    //   console.log(JSON.parse(result.body), 'RESULT IN SERVER');
    res.send(JSON.stringify(result.body));
    }
  })
});

app.get('/event/:locationId', (req, res) => {
  
  const location = req.path.slice(5);
  handler.getEvent(location, (err, result) => {
    if (err) {
      console.log(err, 'events');
    } else {
      console.log(result.body);
      res.send(JSON.stringify(result.body));
    }
  })
});

// app.get('/login', (req, res) => {
//   res.render('login');
// });
// // app.post('/login', (req, res) => {

// // });
// app.get('/signup', function (req, res) {
//   res.render('signup');
// });
// /*
// endpoints for yelp get request
// https://api.yelp.com/v3/businesses/search
// https://api.yelp.com/v3/businesses/{id}
// { location: req.body.location,  
//   rating: req.body.rating, 
//   hours: req.body.hours, 
//   name: req.body.name, 
//   phone: req.body.name, 
//   id: req.body.id }

// https://api.yelp.com/v3/events/{id}
// { location: req.body.location,
//   start: req.body.time_start,
//   end: req.body.time_end,
//   name: req.body.name,
//   phone: req.body.name,
//   id: req.body.id 
//   latitude: req.body.latitude,
//   longitude: req.body.longitude
// }

// */


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

