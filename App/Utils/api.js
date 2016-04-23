var Firebase = require('firebase');

var api = {
  getSunriseTime(lat, lng) {
    var url = `http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;
    return fetch(url).then((results) => results.json());
  },

  getTimezone(lat, lng) {
    var coords = [lat,lng].join(',');
    var url = `https://maps.googleapis.com/maps/api/timezone/json?location=${coords}&timestamp=1&key=AIzaSyBqoY2CsC5vdTPtd55X6XKW2RuLoL2q1nc`;
    return fetch(url).then((results) => results.json());
  },

  convertTime(time) {
    var allTime = 0;
    var timeArr = time.split(' ')[0].split(':').map((item) => parseInt(item));
    if (timeArr[0] === 12) {
      timeArr[0] = 0;
    }
    if (time.includes('PM')) {
      allTime += 43200;
    }
    allTime += ((timeArr[0] * 60 * 60) + (timeArr[1] * 60) + timeArr[2]);
    return allTime;
  },

  addUser(user, email) {
    var uid = user.uid;
    var userData = new Firebase(`https://morning-routine.firebaseio.com/UserData/${uid}`);

    userData.child('email').set(email);
  }
};

module.exports = api;