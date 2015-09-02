var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var VideoList = require('../videos/VideoList');
var FavoriteList = require('../favorites/FavoriteList');
var AccountDetails = require('../accounts/AccountDetails');

var {
  Component,
  StyleSheet,
  PropTypes,
  Navigator,
  View,
  Text,
  TouchableHighlight
} = React;

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

var routes = [
  {
    component: 'queue'
  },
  {
    component: 'latest'
  },
  {
    component: 'popular'
  }
];

class QueuedVideoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selectedTab: 0
    };
  }

  componentDidMount() {
    JukappApi.addEventListener((message) => {
      console.log(message);
      this.fetchData();
    });

    JukappStore.addChangeListener(this._onChange.bind(this));

    this.fetchData();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
    JukappApi.removeEventListener();
  }

  fetchData() {
    console.log('[QueuedVideoList] fetching queuedVideos');
    JukappApi.fetchQueuedVideos().done((queuedVideos) => {
      Dispatcher.dispatch({
        type: 'loadQueuedVideos',
        queuedVideos
      });
    });
  }

  _onChange() {
    this.setState({
      loading: false
    });
  }

  _renderTabBars() {
    var tabbarItems = routes.map((route, index) => {
      var onTabbarItemPress = () => {
        this.setState({selectedTab: index});
        for (var i = Math.abs(this.state.selectedTab - index); i >= 0; i--) {
          if (index > i) {
            this._nav.jumpForward();
          } else if (index < i) {
            this._nav.jumpBack();
          }
        }
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
        <VideoList
          videos={JukappStore.getQueuedVideos()}
          loading={this.state.loading}
        />
      );
    } else if (route.component == 'latest') {
      return (
        <FavoriteList />
      );
    } else if (route.component == 'popular') {
      return (
        <AccountDetails />
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
    top: -20,
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

module.exports = QueuedVideoList;
