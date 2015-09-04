var React = require('react-native');
var Router = require('./Router');
var SearchResultList = require('../videos/SearchResultList');
var FavoriteList = require('../favorites/FavoriteList');
var AccountDetails = require('../accounts/AccountDetails');
var QueuedVideoList = require('../queued_videos/QueuedVideoList');
var SearchButton = require('../components/SearchButton');
var NavigatorTitle = require('./NavigatorTitle');
var SearchInput = require('../videos/SearchInput');

var routes = {
  favorites: {
    component: FavoriteList,
    title: 'Favorites',
    titleComponent: <NavigatorTitle title={'Favorites'} />,
    icon: 'fontawesome|heart'
  },

  room: {
    component: QueuedVideoList,
    title: 'Jukebox',
    titleComponent: <NavigatorTitle title={'Jukebox'} />,
    icon: 'fontawesome|home',
    rightButton: <SearchButton onPress={() => Router.push('search', {})} />
  },

  search: {
    component: SearchResultList,
    titleComponent: <SearchInput />,
    icon: 'fontawesome|search'
  },

  account: {
    component: AccountDetails,
    title: 'My Account',
    titleComponent: <NavigatorTitle title={'My Account'} />,
    icon: 'fontawesome|user'
  }
};

module.exports = routes;
