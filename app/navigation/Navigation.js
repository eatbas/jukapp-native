var React = require('react-native');
var MenuList = require('./MenuList');
var SideMenu = require('react-native-side-menu');
var MenuButton = require('./MenuButton');
var Router = require('./Router');
var routes = require('./routes');
var YoutubeSearchButton = require('../components/YoutubeSearchButton');

var {
  Component,
  StyleSheet,
  View,
  Navigator,
  Text,
  TouchableOpacity,
  TextInput
} = React;

var {
  NavigationBar
} = Navigator;

Router.routes = routes;
var mainRoutes = ['room', 'search', 'favorites', 'account'];

var NavigatorRouteMapper = {
  Title({route}) {
    if (route.search) {
      return (
        <View style={styles.navigatorTitleContainer}>
          <TextInput
            style={styles.navigatorTitleInput}
            placeholder='Search YouTube...'
          />
        </View>
      );
    } else {
      return (
        <View style={styles.navigatorTitleContainer}>
          <Text style={styles.navigatorTitle}>{route.title}</Text>
        </View>
      );
    }
  },

  LeftButton({route}, navigator, index, navState) {
    if (!index){
      return <MenuButton />;
    }

    return (
      <TouchableOpacity onPress={() => {

        // technical debt to prevent double tap
        // try navState.presentedIndex
        console.log(navState);
        if (navigator.state.presentedIndex == 0) {
          return;
        }

        navigator.pop();
      }}>
        <Text style={styles.leftButtonText}>‹</Text>
      </TouchableOpacity>
    );
  },

  RightButton({route}, navigator, index, navState) {
    // have a button, when you click title becomes input box
    // enter query, submit query
    // onPress: creates a new component from route.searchResultsComponent sends the query as a prop
    if (route.rightButton) {
      var RightButtonComponent = route.rightButton;
      return <RightButtonComponent />;
    }

    if (route.search) {
      return <YoutubeSearchButton />;
    }
  }
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {selectedScene: 'search'};
  }

  _renderScene({route, params}, nav) {
    var ChildComponent = route.component;

    var setRef = (ref) => {
      nav._currentComponent = ref;
    };

    return <ChildComponent ref={setRef} {...params}/>;
  }

  _setCurrentNavigator(nav) {
    Router.navigator = nav;
  }

  _setSideMenu(menu) {
    Router.sideMenu = menu;
  }

  _renderMainRoutes() {
    return mainRoutes.map((routeName) => {
      return this._renderMainRoute(routeName);
    });
  }

  _renderMainRoute(routeName) {
    var route = routes[routeName];
    var params = {};

    if (this.state.selectedScene === routeName) {
      return (
        <Navigator
          ref={this._setCurrentNavigator.bind(this)}
          key={routeName}
          initialRoute={{route, params}}
          renderScene={this._renderScene.bind(this)}
          navigationBar={<NavigationBar routeMapper={NavigatorRouteMapper} style={styles.navigatorBar} />}
          sceneStyle={styles.navigatorScene}
        />
      );
    } else {
      return <View key={routeName}/>;
    }
  }

  _sceneChanged(routeName) {
    Router.sideMenu.closeMenu();

    this.setState({
      selectedScene: routeName
    });
  }

  render() {
    return (
      <SideMenu
        ref={this._setSideMenu.bind(this)}
        menu={
          <MenuList
            navigator={this.refs.nav}
            onSceneChanged={this._sceneChanged.bind(this)}
            mainRoutes={mainRoutes}
          />
        }
        touchToClose={true}
      >
        <View style={styles.shadow} >
          {this._renderMainRoutes()}
        </View>
      </SideMenu>
    );
  }
}

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
    flex: 1
  },

  header: {
    height: 64,
    backgroundColor: '#607D8B',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  headerRightView: {
    width: 60
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
  },

  navigatorTitleContainer: {
    height: NavigationBar.Styles.General.NavBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },

  navigatorTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },

  navigatorTitleInput: {
    backgroundColor: '#2D9BE5',
    width: 220,
    height: 32,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 4
  },

  navigatorBar: {
    backgroundColor: '#33ADFF'
  },

  leftButtonText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 10
  },

  navigatorScene: {
    position: 'absolute',
    left: 0,
    top: NavigationBar.Styles.General.NavBarHeight,
    right: 0,
    bottom: 0
  }
});

module.exports = Navigation;
