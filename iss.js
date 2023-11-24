/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  const url = `https://api.ipify.org?format=json`;

  request(url, (error, response, body) => {
    
    if (error) {
      return callback("Error", null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const IP = data.ip;
    callback(null, IP);
  });
};


const fetchCoordsByIP = function(IP, callback) {
  const url = `http://ipwho.is/${IP}`;

  request(url, (err, response, body) => {

    if (err) {
      return callback(err, null);
    }


    const data = JSON.parse(body);
    const { latitude, longitude } = data;
    console.log({ latitude, longitude});
    callback(null, {latitude, longitude});

  });
  
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  
  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);
    const arrayOfFlyTimes = data.response;
    callback(null, arrayOfFlyTimes);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, IP) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(IP, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error,null);
        }
        callback(null, nextPasses);
      });
    });
  });
};



module.exports = { nextISSTimesForMyLocation };