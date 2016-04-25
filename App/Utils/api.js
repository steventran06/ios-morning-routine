var Firebase = require('firebase');

var api = {
  getSunriseTime(lat, lng) {
    var url = `http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;
    return fetch(url).then((results) => results.json());
  },

  convertTimeToSeconds(time) {
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

  convertSecondsToTime(time){
    var hours = parseInt(time/60/60);
    var minutes = parseInt(time/60%60);
    var period;
    if (hours >= 12) {
      period = "PM";
    } else {
      period = "AM";
    }
    if (hours === 0) {
      hours = 12;
    }
    if (hours >= 13) {
      hours -= 12;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    var text = [hours,minutes].join(':') + ' ' + period;

    return {
      text: text,
      value: time
    };  
  },

  buildArrivalTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var value = (hours * 60 * 60) + (minutes * 60);
    var period;
    if (hours >= 12) {
      period = "PM";
    } else {
      period = "AM";
    }
    if (hours === 0) {
      hours = 12;
    }
    if (hours >= 13) {
      hours -= 12;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    var text = [hours,minutes].join(':') + ' ' + period;

    return {
      text: text,
      value: value
    };
  },

  // FIREBASE

  addUser(uid, email) {
    var userData = new Firebase(`https://morning-routine.firebaseio.com/UserData/${uid}`);

    userData.child('email').set(email);
  },

  addUserDetails(uid, home, destination, transportation, travelTime, arrivalTime, leaveTime) {
    var userData = new Firebase(`https://morning-routine.firebaseio.com/UserData/${uid}`);

    userData.child('home').set(home);
    userData.child('destination').set(destination);
    userData.child('transportation').set(transportation);
    userData.child('travelTime').set(travelTime);
    userData.child('arrivalTime').set(arrivalTime);
    userData.child('leaveTime').set(leaveTime);
  },

  // GOOGLE API
  getTimezone(lat, lng) {
    var coords = [lat,lng].join(',');
    var url = `https://maps.googleapis.com/maps/api/timezone/json?location=${coords}&timestamp=1&key=AIzaSyBqoY2CsC5vdTPtd55X6XKW2RuLoL2q1nc`;
    return fetch(url).then((results) => results.json());
  },

  getTimeTravel(home, destination, transportation) {
    var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${Object.values(home).join(',')}|&destinations=${Object.values(destination).join(',')}&mode=${transportation.toLowerCase()}&key=AIzaSyBqoY2CsC5vdTPtd55X6XKW2RuLoL2q1nc`;
    console.log(url);
    return fetch(url).then((results) => results.json());
  }



};

module.exports = api;