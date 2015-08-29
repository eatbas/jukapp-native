var React = require('react-native');
var MenuView = require('../components/MenuView');
var SideMenu = require('react-native-side-menu');
var Router = require('./Router');
var routes = require('./routes');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Navigator,
  Text,
  TouchableHighlight,
  TouchableOpacity
} = React;

var {
  NavigationBar
} = Navigator;

var NavigatorRouteMapper = {
  Title({route}) {
    return (
      <View style={styles.navigatorTitleContainer}>
        <Text style={styles.navigatorTitle}>{route.title}</Text>
      </View>
    );
  },

  LeftButton({route}, navigator, index) {
    if (!index){
      return this._menuButton();
    }

    return (
      <TouchableOpacity onPress={() => {

        // technical debt to prevent double tap
        if (navigator.state.presentedIndex == 0) {
          return;
        }

        navigator.pop();
      }}>
        <Text style={styles.leftButtonText}>‹</Text>
      </TouchableOpacity>
    );
  },

  _menuButton() {
    return (
      <TouchableHighlight
        onPress={() => Router.sideMenu.toggleMenu()}
        activeOpacity={0.3}
        underlayColor='#607D8B'
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

  RightButton() {
    return null;
  }
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {selectedScene: 'room'};
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

  _renderSelectedScene() {
    var route = routes[this.state.selectedScene];
    var params = {}; // remove this

    return (
      <Navigator
        ref={this._setCurrentNavigator.bind(this)}
        initialRoute={{route, params}}
        renderScene={this._renderScene.bind(this)}
        navigationBar={<NavigationBar routeMapper={NavigatorRouteMapper} style={styles.navigatorBar} />}
      />
    );
  }

  // needs multiple navigators
  render() {
    var scene = this._renderSelectedScene();

    return (
      <SideMenu
        ref={this._setSideMenu.bind(this)}
        menu={<MenuView navigator={this.refs.nav} />}
        touchToClose={true}
      >
        <View style={styles.shadow} >
          {scene}
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

  headerLeftView: {
    width: 60
  },

  headerRightView: {
    width: 60
  },

  headerLeftButtonIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft: 20
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

  navigatorBar: {
    backgroundColor: '#33ADFF'
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

  leftButtonText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 10
  },

  navigatorScene: {
    position: 'absolute',
    left: 0,
    top: NavigationBar.Styles.General.TotalNavHeight,
    right: 0,
    bottom: 0
  }
});

module.exports = Navigation;
