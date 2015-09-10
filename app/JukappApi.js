var React = require('react-native');
var JukappStore = require('./stores/JukappStore');
var EventSource = require('NativeModules').RNEventSource;

var JUKAPP_URL = 'http://beta.jukapp.io';

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

  putOptions(body) {
    var options = this.defaultOptions();

    options.method = 'PUT';
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
    return JSON.stringify({youtube_id: video.details.youtube_id});
  },

  fetch(url, options) {
    return fetch(JUKAPP_URL + url, options || this.defaultOptions());
  },

  fetchJson(url, options) {
    return this.fetch(url, options).then((response) => response.json());
  },

  fetchRooms() {
    return this.fetchJson('/rooms');
  },

  joinRoom(roomId) {
    return this.fetchJson('/rooms/' + roomId + '/join');
  },

  fetchQueuedVideos() {
    return this.fetchJson('/videos?type=playlist')
      .then((responseData) => {
        return responseData.map((videoData) => {
          return {
            details: videoData.youtube_video,
            statistics: videoData
          };
        });
      });
  },

  searchVideo(query) {
    return this.fetchJson('/search?query=' + query)
      .then((responseData) => {
        return responseData.map((youtubeVideoData) => {
          return {
            details: youtubeVideoData,
            statistics: youtubeVideoData.video
          };
        });
      });
  },

  fetchFavorites() {
    if (!JukappStore.loggedIn()) {
      console.log('[WARNING] fetchFavorites when not logged in');
      return new Promise((fulfill) => {
        fulfill([]);
      });
    }

    return this.fetchJson('/favorites')
      .then((responseData) => {
        console.log('[Favorites]', responseData);
        return responseData.map((favoriteData) => {
          return {
            details: favoriteData.youtube_video,
            statistics: favoriteData.video
          };
        });
      })
      .catch((response) => {
        console.log('Favorites error', response);
        AlertIOS.alert('Favorites error' + response);
      });
  },

  queueVideo(video) {
    var options = this.putOptions();

    return this.fetch(`/videos/${video.youtubeId}/queue`, options)
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

  toggleFavorite(video, isFavorite) {
    return new Promise((fulfill) => {
      if (isFavorite) {
        return this.unfavoriteVideo(video)
          .done(() => fulfill());
      } else {
        return this.favoriteVideo(video)
          .done(() => fulfill());
      }
    });
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
    var options = this.deleteOptions();

    return this.fetch(`/favorites/${video.details.youtube_id}`, options)
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
