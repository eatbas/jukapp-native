var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var QueuedVideoList = require('../queued_videos/QueuedVideoList');
var FavoriteList = require('../favorites/FavoriteList');
var PopularVideoList = require('../videos/PopularVideoList');

var {
  Component,
  StyleSheet,
  PropTypes,
  Navigator,
  View,
  Text,
  TouchableHighlight
} = React;

// BEGINNING OF TABBARITEM

class TabbarItem extends Component {
  render() {
    var containerStyle = [styles.tabbarItemContainer];
    var textStyle = [styles.tabbarItemText];

    if (this.props.active) {
      containerStyle.push(styles.tabbarItemContainerActive);
      textStyle.push(styles.tabbarItemTextActive);
    }

    return (
      <TouchableHighlight
        style={{flex: 1}}
        underlayColor="#F5F5F5"
        activeOpacity={0.3}
        onPress={this.props.onPress}
      >
        <View style={containerStyle}>
          <Text style={textStyle}>{this.props.routeName.toUpperCase()}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

TabbarItem.propTypes = {
  active: PropTypes.bool,
  onPress: PropTypes.func,
  routeName: PropTypes.string.isRequired
};

// END OF TABBARITEM

var routes = [
  {
    component: 'queue'
  },
  {
    component: 'popular'
  },
  {
    component: 'favorites'
  }
];

class Jukebox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: JukappStore.loggedIn(),
      selectedTab: 0
    };
  }

  componentDidMount() {
    JukappApi.addEventListener();
  }

  componentWillUnmount() {
    JukappApi.removeEventListener();
  }

  // TODO selectedTab doesn't update when navigating with gestures
  _renderTabBars() {
    var tabbarItems = routes.map((route, index) => {
      if (route.component == 'favorites' && !this.state.loggedIn) {
        return;
      }

      var onTabbarItemPress = () => {
        this.setState({selectedTab: index});
        this._nav.jumpTo(routes[index]);
      };

      return (
        <TabbarItem
          key={route.component}
          routeName={route.component}
          active={this.state.selectedTab == index}
          onPress={onTabbarItemPress}
        />
      );
    });

    return (
      <View style={styles.tabbarContainer}>
        {tabbarItems}
      </View>
    );
  }

  _renderScene(route) {
    if (route.component == 'queue') {
      return (
        <QueuedVideoList />
      );
    } else if (route.component == 'popular') {
      return (
        <PopularVideoList />
      );
    } else if (route.component == 'favorites') {
      return (
        <FavoriteList />
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this._renderTabBars()}
        <Navigator
          ref={(component) => this._nav = component}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={this._renderScene.bind(this)}
          sceneStyle={styles.navigatorScene}
          configureScene={(route, params) => {
            console.log(route, params);
            return Navigator.SceneConfigs.HorizontalSwipeJump;
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  navigatorScene: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },

  tabbarContainer: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    backgroundColor: 'white'
  },

  // TabbarItem
  tabbarItemText: {
    fontWeight: 'bold'
  },

  tabbarItemTextActive: {
    color: '#33ADFF'
  },

  tabbarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tabbarItemContainerActive: {
    borderBottomColor: '#33ADFF',
    borderBottomWidth: 2
  }

});

module.exports = Jukebox;
