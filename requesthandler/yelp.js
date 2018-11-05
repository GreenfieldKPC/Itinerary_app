const request = require('request');
const config = require('../config.js');

const getTopRestaurants = function (location, callback) {
  const option = {
    url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
    headers: {
      'User-Agent': 'request',
      Authorization: `${config.TOKEN}`,
      maxResult: 5,
    },
  };
  request.get(option, (err, res) => {
    if (err) {
      console.log(err, 'ERROR IN HANDLER');
    } else {
      // console.log(res, "RESPONSE IN HANDLER")
      return callback(null, res);
    }
  });
};


const getEvent = function (location ,callback) {
  let cap = location[0].toUpperCase() + location.substr(1);
  request.get({

    url: `https://www.eventbriteapi.com/v3/events/search/?location.address=${cap}&location.within=25km`,

    headers: {
      'Authorization': `${config.Event}`,
      "verify" : true,
      "maxResult": 20,
    },
  }, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      return callback(null, res);
    }
  });
};

const getUserInterest = function (array, callback) {
  const interests = [
    { id: 101,
      category: 'business'
    },
    { id: 115,
      category: 'education'
    },
    { id: 105,
      category: 'performing and arts'
    },
    { id: 108,
      category: 'sports'
    },
    { id: 104,
      category: 'film and media'
    },
    { id: 113,
      category: 'community and culture'
    },
    { id: 111,
      category: 'charity and causes'
    },
    { id: 109,
      category: 'travel and outdoor'
    },
    { id: 102,
      category: 'science and technology'
    },
    { id: 107,
      category: 'health and wellness'
    },
    { id: 106,
      category: 'fashion'
    },
    { id: 116,
      category: 'seasonal'
    },
    { id: 114,
      category: 'regional'
    },
    { id: 112,
      category: 'government'
    },
    { id: 117,
      category: 'home and lifestyle',
    },
    { id: 199,
      category: 'other',
    }];
  const interestId = interests.map((obj) => {
      array.forEach((interest) => {
        if (obj.category === interest) {
          return obj.id;
        }
      });
    });
  request.get({
    url: `https://www.eventbriteapi.com/v3/event/search/?categories=${interestId}`,
    headers: {
      'Authorization': `${config.Event}`,
      "verify": true,
      "maxResult": 20,
    },
  }, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      return callback(null, res);
    }
  });
};

module.exports = {
  getTopRestaurants,
  getEvent,
  getUserInterest,
};
