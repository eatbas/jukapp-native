var React = require('react-native');
var SearchResultList = require('../videos/SearchResultList');
var FavoriteList = require('../favorites/FavoriteList');
var AccountDetails = require('../accounts/AccountDetails');
var QueuedVideoList = require('../queued_videos/QueuedVideoList');
var YoutubeSearchButton = require('../videos/YoutubeSearchButton');
var SearchIcon = require('../components/SearchIcon');
var NavigatorTitle = require('./NavigatorTitle');
var SearchInput = require('../videos/SearchInput');

var routes = {
  favorites: {
    component: FavoriteList,
    title: 'Favorites',
    titleComponent: <NavigatorTitle title={'Favorites'} />,
    icon: 'fontawesome|star'
  },

  room: {
    component: QueuedVideoList,
    title: 'Room', // TODO: Should be the room name probably?
    titleComponent: <NavigatorTitle title={'Room'} />,
    icon: 'fontawesome|home',
    rightButton: <YoutubeSearchButton />
  },

  search: {
    component: SearchResultList,
    titleComponent: <SearchInput />,
    icon: 'fontawesome|search',
    rightButton: <SearchIcon />
  },

  account: {
    component: AccountDetails,
    title: 'My Account',
    titleComponent: <NavigatorTitle title={'My Account'} />,
    icon: 'fontawesome|user'
  }
};

module.exports = routes;
