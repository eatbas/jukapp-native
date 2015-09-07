var React = require('react-native');
var MenuList = require('./MenuList');
var SideMenu = require('react-native-side-menu');
var MenuButton = require('./MenuButton');
var Router = require('./Router');
var routes = require('./routes');
var Toast = require('../components/Toast');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Navigator,
  StatusBarIOS,
  TouchableOpacity
} = React;

var {
  NavigationBar
} = Navigator;

Router.routes = routes;
StatusBarIOS.setStyle('light-content');
var mainRoutes = ['jukebox', 'account'];

var NavigatorRouteMapper = {
  Title({route}) {
    return (
      <View style={styles.navigatorTitleContainer}>
        {route.titleComponent}
      </View>
    );
  },

  LeftButton({route}, navigator, index) {
    if (!index){
      return <MenuButton />;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          Router.pop();
        }}
        style={styles.leftButton}
      >
        <Icon
          style={styles.leftButtonIcon}
          name='fontawesome|arrow-left'
          size={20}
          color='white'
        />
      </TouchableOpacity>
    );
  },

  RightButton({route}) {
    return route.rightButton;
  }
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {selectedScene: 'jukebox'};
  }

  _renderScene({route, params}) {
    var ChildComponent = route.component;

    var setRef = (ref) => {
      Router._currentComponent = ref;
    };

    return <ChildComponent ref={setRef} {...params}/>;
  }

  _setCurrentNavigator(nav) {
    Router.navigator = nav;
  }

  _setSideMenu(menu) {
    Router.sideMenu = menu;
  }

  _renderSelectedScene() {
    var route = routes[this.state.selectedScene];
    var params = {};

    return (
      <Navigator
        key={this.state.selectedScene}
        ref={this._setCurrentNavigator.bind(this)}
        initialRoute={{route, params}}
        renderScene={this._renderScene.bind(this)}
        navigationBar={<NavigationBar routeMapper={NavigatorRouteMapper} style={styles.navigatorBar} />}
        sceneStyle={styles.navigatorScene}
        configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
      />
    );
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
            onSceneChanged={this._sceneChanged.bind(this)}
            mainRoutes={mainRoutes}
          />
        }
        touchToClose={true}
      >
        <View style={styles.shadow} >
          {this._renderSelectedScene()}
          <Toast ref={(component) => Router._toast = component} />
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

  navigatorBar: {
    backgroundColor: '#33ADFF'
  },

  leftButton: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },

  leftButtonIcon: {
    width: 20,
    height: 20,
    color: 'white'
  },

  navigatorScene: {
    position: 'absolute',
    left: 0,
    top: 40,
    right: 0,
    bottom: 0
  }
});

module.exports = Navigation;
