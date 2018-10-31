const request = require('request');
const config = require('../config.js');

const getTopRestaurants = function(callback) {
  const option = {
    url: "https://api.yelp.com/v3/businesses/",
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`,
      'maxResult': 5
    }
  }
  request.get(option, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      return callback(res);
    }
  })
}
module.exports = {
  getTopRestaurants
}