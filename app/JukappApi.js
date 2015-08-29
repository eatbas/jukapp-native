var React = require('react-native');
var JukappStore = require('./stores/JukappStore');
var EventSource = require('NativeModules').RNEventSource;
var Dispatcher = require('../Dispatcher');

var JUKAPP_URL = 'https://jukapp-api.herokuapp.com';

var {
  AlertIOS,
  DeviceEventEmitter
} = React;

var eventListener;

var JukappApi = {
  defaultOptions() {
    var currentRoom = JukappStore.currentRoom();
    var user = JukappStore.currentUser();

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

  videoOptions(video) {
    return JSON.stringify({
      youtube_id: video.youtube_id,
      title: video.title
    });
  },

  fetchRooms() {
    console.log('fetch');
    fetch(JUKAPP_URL + '/rooms', this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then((rooms) => {
        return Dispatcher.dispatch({type: 'loadRooms', rooms});
      });
  },

  joinRoom(roomId) {
    return fetch(JUKAPP_URL + '/rooms/' + roomId + '/join', this.defaultOptions())
      .then((response) => {
        return response.json();
      });
  },

  searchVideo(query) {
    var videos = [];

    return fetch(JUKAPP_URL + '/search?query=' + query, this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        videos = responseData;

        return this.fetchFavorites();
      })
      .then((responseData) => {
        return this.checkFavorites(videos, responseData);
      });
  },

  queueVideo(video) {
    var options = this.defaultOptions();
    options['method'] = 'POST';
    options['body'] = this.videoOptions(video);

    fetch(JUKAPP_URL + '/queue', options)
      .then((response) => {
        if (response.status == 201) {
          console.log('Successfully queued video');
        } else {
          console.log('Could not queue video');
        }
      })
      .catch((response) => {
        console.log('Queue error', response);
        AlertIOS.alert('Queue error' + response);
      });
  },

  login(username, password) {
    var options = this.defaultOptions();
    options['method'] = 'POST';
    options['body'] = JSON.stringify({
      user: {username, password}
    });

    return fetch(JUKAPP_URL + '/users/sign_in', options)
      .then((response) => {
        if (response.status == 201) {
          console.log('Successfully logged in');
          return response.json();
        } else {
          console.log('Could not log in');
          // test this case
          return Promise.reject(new Error);
        }
      })
      .then((userData) => {
        return {
          username: userData.username,
          authToken: userData.authentication_token
        };
      });
  },

  fetchQueuedVideos() {
    var videos = [];

    return fetch(JUKAPP_URL + '/queued_videos', this.defaultOptions())
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
        console.log('Queued videos error', response);
        AlertIOS.alert('Queued videos error' + response);
      });
  },

  checkFavorites(videos, favorites) {
    for (var video of videos) {
      for (var favoriteVideo of favorites) {
        if (video.id == favoriteVideo.id) video['isFavorite'] = true;
      }
      if (!video.isFavorite) video['isFavorite'] = false;
    }

    return videos;
  },

  fetchFavorites() {
    if (!JukappStore.loggedIn()) {
      return new Promise((fulfill) => {
        fulfill([]);
      });
    }

    return fetch(JUKAPP_URL + '/favorites', this.defaultOptions())
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var videos = [];
        for (var favoriteVideo of responseData) {
          var video = favoriteVideo.video;
          video['isFavorite'] = true;

          videos.push(video);
        }

        return videos;
      })
      .catch((response) => {
        console.log('Favorites error', response);
        AlertIOS.alert('Favorites error' + response);
      });
  },

  favoriteVideo(video) {
    var options = this.defaultOptions();
    options['method'] = 'POST';
    options['body'] = this.videoOptions(video);

    fetch(JUKAPP_URL + '/favorites', options)
      .then((response) => {
        if (response.status == 201) {
          console.log('Successfully favorited video');
        } else {
          console.log('Could not favorite video');
        }
      })
      .catch((response) => {
        console.log('Favorites error', response);
        AlertIOS.alert('Favorites error' + response);
      });
  },

  unfavoriteVideo(video) {
    var options = this.defaultOptions();
    options['method'] = 'DELETE';
    options['body'] = this.videoOptions(video);

    fetch(JUKAPP_URL + '/favorites', options)
      .then((response) => {
        if (response.status == 200) {
          console.log('Successfully unfavorited video');
        } else {
          console.log('Could not unfavorite video');
        }
      })
      .catch((response) => {
        console.log('Favorites error', response);
        AlertIOS.alert('Favorites error' + response);
      });
  },

  addEventListener(onEvent) {
    eventListener = DeviceEventEmitter.addListener(
      'EventSourceMessage', (message) => {
        if (message.event != 'heartbeat') {
          onEvent(message);
        }
      });

    EventSource.connectWithURL(JUKAPP_URL + '/events?channels[]=queue-' + JukappStore.currentRoom().id);
  },

  removeEventListener() {
    EventSource.close();

    if (eventListener) {
      eventListener.remove();
    }
  }
};

module.exports = JukappApi;
