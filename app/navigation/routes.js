var SearchResultsListView = require('../videos/SearchResultsListView');
var FavoritesListView = require('../favorites/FavoritesListView');
var AccountView = require('../accounts/AccountView');
var RoomView = require('../rooms/RoomView');

var routes = {
  favorites: {
    component: FavoritesListView,
    title: 'Favorites',
    icon: 'fontawesome|star'
  },

  room: {
    component: RoomView,
    title: 'Room', // TODO: Should be the room name probably?
    icon: 'fontawesome|home'
  },

  search: {
    component: SearchResultsListView,
    title: 'Search',
    icon: 'fontawesome|search'
  },

  account: {
    component: AccountView,
    title: 'My Account',
    icon: 'fontawesome|user'
  }
};

module.exports = routes;
