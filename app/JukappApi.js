var React = require('react-native');
var JukappStore = require('./stores/JukappStore');
var EventSource = require('NativeModules').RNEventSource;

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

  postOptions(body) {
    var options = this.defaultOptions();

    options.method = 'POST';
    options.body = body;

    return options;
  },

  deleteOptions(body) {
    var options = this.defaultOptions();

    options.method = 'DELETE';
    options.body = body;

    return options;
  },

  videoOptions(video) {
    return JSON.stringify({
      youtube_id: video.youtubeId,
      title: video.title
    });
  },

  fetch(url, options) {
    return fetch(JUKAPP_URL + url, options || this.defaultOptions());
  },

  fetchRooms() {
    return this.fetch('/rooms')
      .then((response) => {
        return response.json();
      });
  },

  joinRoom(roomId) {
    return this.fetch('/rooms/' + roomId + '/join')
      .then((response) => {
        return response.json();
      });
  },

  searchVideo(query) {
    return this.fetch('/search?query=' + query)
      .then((response) => {
        return response.json();
      });
  },

  queueVideo(video) {
    var options = this.postOptions(this.videoOptions(video));

    return this.fetch('/queue', options)
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
    var user = JSON.stringify({
      user: {username, password}
    });

    var options = this.postOptions(user);

    return this.fetch('/users/sign_in', options)
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
    return this.fetch('/queued_videos')
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        return responseData.map((queueVideoData) => queueVideoData.video);
      })
      .catch((response) => {
        console.log('Queued videos error', response);
        AlertIOS.alert('Queued videos error' + response);
      });
  },

  fetchFavorites() {
    if (!JukappStore.loggedIn()) {
      console.log('[WARNING] fetchFavorites when not logged in');
      return new Promise((fulfill) => {
        fulfill([]);
      });
    }

    return this.fetch('/favorites')
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        return responseData.map((favoriteData) => favoriteData.video);
      })
      .catch((response) => {
        console.log('Favorites error', response);
        AlertIOS.alert('Favorites error' + response);
      });
  },

  toggleFavorite(video) {
    if (video.isFavorite) {
      return this.unfavoriteVideo(video);
    } else {
      return this.favoriteVideo(video);
    }
  },

  favoriteVideo(video) {
    var options = this.postOptions(this.videoOptions(video));

    return this.fetch('/favorites', options)
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
    var options = this.deleteOptions(this.videoOptions(video));

    return this.fetch('/favorites', options)
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
    eventListener.remove();
  }
};

module.exports = JukappApi;
