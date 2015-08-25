'use strict';

var React = require('react-native');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var EventSource = require('NativeModules').RNEventSource;

var JUKAPP_URL = 'https://jukapp-api.herokuapp.com'

var {
  AlertIOS,
  DeviceEventEmitter
} = React;

var eventListener;


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

  login: function(username, password) {
    var options = this.defaultOptions();
    options['method'] = 'POST'
    options['body'] = JSON.stringify({
      user: {
        username: username,
        password: password
      }
    });

    return fetch(JUKAPP_URL + "/users/sign_in", options)
      .then((response) => {
        if (response.status == 201) {
          return response.json();
          console.log('Successfully logged in')
        } else {
          return Promise.reject(new Error);
          console.log('Could not log in')
        }
      })
      .then((responseData => {
        if (!responseData) return;
        var user = {
          username: responseData["username"],
          authToken: responseData["authentication_token"]
        };

        JukappActions.loggedIn(user);

        this.fetchFavorites();
      }))
  },

  fetchQueuedVideos: function() {
    fetch(JUKAPP_URL + "/queued_videos", this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then(JukappActions.loadedQueuedVideos)
      .catch((response) => {
        console.log("Queued videos error", response)
        AlertIOS.alert("Queued videos error" + response)
      });
  },

  fetchFavorites: function() {
    return fetch(JUKAPP_URL + "/favorites", this.defaultOptions())
      .then((response) => {
        return response.json();
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

    fetch(JUKAPP_URL + "/favorites", options)
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
  },

  addEventListener: function(onEvent) {
    eventListener = DeviceEventEmitter.addListener(
      'EventSourceMessage', function(message) {
        if (message.event != 'heartbeat') {
          onEvent(message);
        }
      });

    EventSource.connectWithURL(JUKAPP_URL + "/events?channels[]=queue-" + JukappStore.getCurrentRoom());
  },

  removeEventListener: function() {
    EventSource.close();

    if (eventListener) {
      eventListener.remove();
    }
  }
}


module.exports = JukappApi;
