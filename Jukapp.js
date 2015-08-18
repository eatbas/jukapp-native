var React = require('react-native');
var {AlertIOS} = React;
var JUKAPP_URL = "https://jukapp-api.herokuapp.com"

class Jukapp {

  defaultOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Room-ID': '1',
        'X-AuthToken': 'vbSFYuoGRcpaUSiAdyZM',
        'X-Username': 'berk'
      }
    }
  }

  fetch(url) {
    return fetch(JUKAPP_URL + url, this.defaultOptions())
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .catch((response) => {
        console.log("Fetch error", response)
        AlertIOS.alert("Fetch error" + response)
      });
  }
}

module.exports = new Jukapp()
