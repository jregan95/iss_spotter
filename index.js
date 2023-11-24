const { nextISSTimesForMyLocation } = require('./iss');

const printTimes = function(passTimes) {
  for (const time of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};




nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printTimes(passTimes);
});










//const { fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


//fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
  //if (error) {
    //console.log("It didn't work!" , error);
    //return;
  //}

  //console.log('It worked! Returned coordinates:' , coordinates);
//});

//fetchISSFlyOverTimes({ latitude: 49.2827291, longitude: -123.1207375 }, (error, arrayOfFly) => {
  //if (error) {
    //console.log("It didn't work ", error);
    //return;
  //}

  
  //console.log('IT worked', arrayOfFly);
//})