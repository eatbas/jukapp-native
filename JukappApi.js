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
      options['headers']['X-Room-ID'] = currentRoom.id;
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
    var videos = [];

    return fetch(JUKAPP_URL + '/search?query=' + query, this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        for (var searchResult of responseData) {
          if (searchResult.id) videos.push(searchResult);
        }

        return this.fetchFavorites();
      })
      .then((responseData) => {
        return this.checkFavorites(videos, responseData);
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
          console.log('Could not log in')
          return Promise.reject(new Error);
        }
      })
      .then((responseData => {
        if (!responseData) return;

        var user = {
          username: responseData["username"],
          authToken: responseData["authentication_token"]
        };

        JukappActions.loggedIn(user);
      }))
  },

  fetchQueuedVideos: function() {
    var videos = [];

    return fetch(JUKAPP_URL + "/queued_videos", this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        for (var queuedVideo of responseData) {
          videos.push(queuedVideo.video);
        }

        return this.fetchFavorites();
      })
      .then((responseData) => {
        return this.checkFavorites(videos, responseData);
      })
      .catch((response) => {
        console.log("Queued videos error", response)
        AlertIOS.alert("Queued videos error" + response)
      });
  },

  checkFavorites: function(videos, favorites) {
    for (var video of videos) {
      for (var favoriteVideo of favorites) {
        if (video.id == favoriteVideo.id) video["isFavorite"] = true;
      }
      if (!video.isFavorite) video["isFavorite"] = false;
    }

    return videos;
  },

  fetchFavorites: function() {
    if (!JukappStore.isLoggedIn()) {
      return new Promise((fulfill, reject) => {
        fulfill([]);
      });
    }

    return fetch(JUKAPP_URL + "/favorites", this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var videos = [];
        for (var favoriteVideo of responseData) {
          var video = favoriteVideo.video;
          video["isFavorite"] = true;

          videos.push(video);
        }

        return videos;
      })
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
          console.log('Successfully favorited video')
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
          console.log('Successfully unfavorited video')
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

    EventSource.connectWithURL(JUKAPP_URL + "/events?channels[]=queue-" + JukappStore.getCurrentRoom().id);
  },

  removeEventListener: function() {
    EventSource.close();

    if (eventListener) {
      eventListener.remove();
    }
  }
}


module.exports = JukappApi;
