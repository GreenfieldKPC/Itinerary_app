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


const getEvent = function (location ,callback) {
  request.get({
    url: `https://www.eventbriteapi.com/v3//events/search?location=${location}`,
    headers: {
      'Authorization': `${config.Event}`,
      'maxResult': 5
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