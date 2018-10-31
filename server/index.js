const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database/index.js'); // needs to require towards the database
const handler = require('../requesthandler/yelp.js'); // this helper get the information from the yelp api
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client')); // path to the front end

app.get('/', (req, res) => {
  res.status(200).send(index.js);

});
// app.get('/login', (req, res) => {
//   res.render('login');
// });
// app.post('/login', (req, res) => {

// });
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


app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!');
});