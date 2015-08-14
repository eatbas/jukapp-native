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

  queueVideo(video) {
    var options = this.defaultOptions()
    options['method'] = 'POST'
    options['body'] = JSON.stringify({
      youtube_id: video.youtube_id,
      title: video.title
    })

    return fetch(JUKAPP_URL + "/queue", options)
      .catch((response) => {
        console.log("Queue error", response)
        AlertIOS.alert("Queue error" + response)
      });
  }
}

module.exports = new Jukapp()
