/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var RoomsListView = require('./RoomsListView')
var JukappStore = require('./JukappStore')
var JukappActions = require('./JukappActions');
var SearchResultsListView = require('./SearchResultsListView')
var FavoritesListView = require('./FavoritesListView')
var LoginView = require('./LoginView')
var RoomView = require('./RoomView')
var MenuView = require('./MenuView');
var SideMenu = require('react-native-side-menu');

var {
  Icon
} = require('react-native-icons');

var {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  Text,
  TouchableHighlight
} = React;

var Jukapp = React.createClass({
  getInitialState: function() {
    return {
      isInRoom: JukappStore.isInRoom(),
      isLoggedIn: JukappStore.isLoggedIn()
    }
  },

  componentDidMount: function() {
    JukappStore.initialize();
    JukappStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
  },

  _handleNextButtonPress: function() {
    this.refs.nav.push({
      component: SearchResultsListView,
      title: "Search"
    });
  },

  _menuButton: function() {
    return (
      <TouchableHighlight
        onPress={() => this.refs.sideMenu.toggleMenu()}
        activeOpacity={0.3}
        underlayColor="#607D8B"
        style={styles.headerLeftView}
      >
        <Icon
          name='fontawesome|bars'
          size={20}
          color='black'
          style={styles.headerLeftButtonIcon}
        />
      </TouchableHighlight>
    );
  },

  _renderScene: function(route, nav) {
    var scene, title;

    switch (route.id) {
      case 'favorites':
        scene = <FavoritesListView />;
        title = 'Favorites'
        break;
      case 'room':
        scene = <RoomView />;
        title = 'Room'
        break;
      case 'search':
        scene = <SearchResultsListView />;
        title = 'Search';
        break;
    }

    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          {this._menuButton()}
          <Text style= { styles.headerText }>{ title }</Text>
          <View style={ styles.headerRightView }>

          </View>
        </View>
        {scene}
      </View>
    );
  },

  render: function() {
    if (!this.state.isInRoom) {
      return this.renderRoomsList();
    }

    return (
      <SideMenu
        ref='sideMenu'
        menu={<MenuView navigator={this.refs.nav} />}
        touchToClose={true}
      >
        <View style={styles.shadow} >
          <Navigator
            ref='nav'
            initialRoute={{id: 'room'}}
            renderScene={this._renderScene}
          />
        </View>
      </SideMenu>
    );
  },

  renderRoomsList: function() {
    return (<RoomsListView />)
  },

  _onChange: function() {
    this.setState({
      isInRoom: JukappStore.isInRoom(),
      isLoggedIn: JukappStore.isLoggedIn()
    })
  },
});

var styles = StyleSheet.create({
  shadow: {
    flex: 1,
    shadowColor: '#000000',
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  container: {
    flex: 1,
  },

  header: {
    height: 64,
    backgroundColor: "#607D8B",
    flexDirection: 'row',
    justifyContent: 'center',
  },

  headerLeftView: {
    width: 60
  },

  headerRightView: {
    width: 60
  },

  headerLeftButtonIcon: {
    width: 20,
    height: 20,
    marginTop: 30,
    marginLeft: 20,
  },

  headeRightButtonImage: {
    marginTop: 30,
    marginRight: 20,
    width: 20,
    height: 15
  },

  headerText: {
    flex: 2,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30
  }
});

AppRegistry.registerComponent('Jukapp', () => Jukapp);
