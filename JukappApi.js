'use strict';

var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');

var JUKAPP_URL = 'https://jukapp-api.herokuapp.com'

var JukappApi = {
  defaultOptions: function() {
    var currentRoom = JukappStore.getCurrentRoom();
    var user = JukappStore.getUser();

    var options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (currentRoom) {
      options['headers']['X-Room-ID'] = currentRoom;
    }

    if (user) {
      options['headers']['X-Username'] = user.username;
      options['headers']['X-AuthToken'] = user.authToken;
    }

    return options;
  },

  videoOptions: function(video) {
    return JSON.stringify({
      youtube_id: video.youtube_id,
      title: video.title
    });
  },

  fetchRooms: function() {
    fetch(JUKAPP_URL + '/rooms', this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then(JukappActions.loadedRooms);
  },

  joinRoom: function(roomId) {
    fetch(JUKAPP_URL + '/rooms/' + roomId + '/join', this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then(JukappActions.joinedRoom)
      .catch((response) => {
        JukappActions.leftRoom();
        console.log('Join error', response);
        AlertIOS.alert('Join error' + response);
      });
  },

  searchVideo: function(query) {
    fetch(JUKAPP_URL + '/search?query=' + query)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        JukappActions.completedSearch(responseData["videos"])
      });
  },

  queueVideo: function(video) {
    var options = this.defaultOptions();
    options['method'] = 'POST'
    options['body'] = this.videoOptions(video);

    fetch(JUKAPP_URL + "/queue", options)
      .then((response) => {
        if (response.status == 201) {
          console.log('Successfully queued video')
        } else {
          console.log('Could not queue video')
        }
      })
      .catch((response) => {
        console.log("Queue error", response)
        AlertIOS.alert("Queue error" + response)
      });
  },

  login: function() {
    var user = {
      username: 'berk',
      authToken: 'vbSFYuoGRcpaUSiAdyZM'
    };

    JukappActions.loggedIn(user);
    this.fetchFavorites();
  },

  fetchFavorites: function() {
    fetch(JUKAPP_URL + "/favorites", this.defaultOptions())
      .then((response) => {
        return response.json()
      })
      .then(JukappActions.loadedFavorites)
      .catch((response) => {
        console.log("Favorites error", response)
        AlertIOS.alert("Favorites error" + response)
      });
  },

  favoriteVideo: function(video) {
    var options = this.defaultOptions();
    options['method'] = 'POST'
    options['body'] = this.videoOptions(video);

    fetch(JUKAPP_URL + "/favorites", options)
      .then((response) => {
        if (response.status == 201) {
          this.fetchFavorites();
        } else {
          console.log('Could not favorite video')
        }
      })
      .catch((response) => {
        console.log("Favorites error", response)
        AlertIOS.alert("Favorites error" + response)
      });
  },

  unfavoriteVideo: function(video) {
    var options = this.defaultOptions();
    options['method'] = 'DELETE'
    options['body'] = this.videoOptions(video);

    return fetch(JUKAPP_URL + "/favorites", options)
      .then((response) => {
        if (response.status == 200) {
          this.fetchFavorites();
        } else {
          console.log('Could not unfavorite video')
        }
      })
      .catch((response) => {
        console.log("Favorites error", response)
        AlertIOS.alert("Favorites error" + response)
      });
  }
}


module.exports = JukappApi;
