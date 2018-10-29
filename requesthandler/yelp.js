const request = require('request');

const getTopRestaurants = function(callback) {
  const option = {
    url: "https://api.yelp.com/v3/businesses/",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token',
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
module.exports  = {
  getTopRestaurants
}