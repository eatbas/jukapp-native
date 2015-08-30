var SearchResultList = require('../videos/SearchResultList');
var FavoriteList = require('../favorites/FavoriteList');
var AccountDetails = require('../accounts/AccountDetails');
var QueuedVideoList = require('../queued_videos/QueuedVideoList');
var YoutubeSearchButton = require('../components/YoutubeSearchButton');

var routes = {
  favorites: {
    component: FavoriteList,
    title: 'Favorites',
    icon: 'fontawesome|star'
  },

  room: {
    component: QueuedVideoList,
    title: 'Room', // TODO: Should be the room name probably?
    icon: 'fontawesome|home',
    rightButton: YoutubeSearchButton
  },

  search: {
    component: SearchResultList,
    title: 'Search',
    icon: 'fontawesome|search',
    search: true
  },

  account: {
    component: AccountDetails,
    title: 'My Account',
    icon: 'fontawesome|user'
  }
};

module.exports = routes;
