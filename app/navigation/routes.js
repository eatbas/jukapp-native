var SearchResultsListView = require('../videos/SearchResultsListView');
var FavoritesListView = require('../favorites/FavoritesListView');
var AccountView = require('../accounts/AccountView');
var RoomView = require('../rooms/RoomView');

var routes = {
  favorites: {
    component: FavoritesListView,
    title: 'Favorites'
  },

  room: {
    component: RoomView,
    title: 'Room' // TODO: Should be the room name probably?
  },

  search: {
    component: SearchResultsListView,
    title: 'Search'
  },

  account: {
    component: AccountView,
    title: 'My Account'
  }
};

module.exports = routes;
