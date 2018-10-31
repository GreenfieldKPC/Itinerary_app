const request = require('request');
const config = require('../config.js');

const getTopRestaurants = function(location, callback) {
  const option = {
    url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`,
      'maxResult': 5
    }
  }
  request.get(option, (err, res) => {
    if (err) {
      console.log(err, "ERROR IN HANDLER");
    } else {
      //console.log(res, "RESPONSE IN HANDLER")
      return callback(null, res);
    }
  })
}


const getEvent = function (callback) {
  request.get({
    url: "https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ",
    headers: {
      'Authorization': `${config.Event}`
    }

  }, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      return callback(null, res);
    }
  })
}


module.exports = {
  getTopRestaurants,
  getEvent

}