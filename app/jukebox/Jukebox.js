var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var TabBar = require('./TabBar');
var QueuedVideoList = require('../queued_videos/QueuedVideoList');
var FavoriteList = require('../favorites/FavoriteList');
var PopularVideoList = require('../videos/PopularVideoList');

var {
  Component,
  StyleSheet,
  Navigator
} = React;

class Jukebox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: JukappStore.loggedIn(),
      selectedTab: 'queue'
    };
  }

  componentDidMount() {
    JukappApi.addEventListener(this._onEventReceived.bind(this));
    JukappStore.addChangeListener(this._onChange.bind(this));
    this._nav.navigationContext.addListener('willfocus', this._onTabWillFocus.bind(this));
    this._nav.navigationContext.addListener('didfocus', this._onTabDidFocus.bind(this));
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
    JukappApi.removeEventListener();
  }

  _onEventReceived(operation) {
    if (operation == 'play') {
      this._currentComponent.fetchData();
    } else if (operation == 'new' && this.state.selectedTab == 'queue') {
      this._currentComponent.fetchData();
    }
  }

  _onTabWillFocus(event) {
    this.setState({
      selectedTab: event.data.route.name
    });
  }

  _onTabDidFocus() {
    this._currentComponent.fetchData();
  }

  _onChange() {
    this.setState({
      loggedIn: JukappStore.loggedIn()
    });
  }

  _renderTab(tab) {
    var TabComponent = tab.component;
    return <TabComponent ref={(component) => this._currentComponent = component} />;
  }

  render() {
    var tabs = [
      {
        name: 'queue',
        component: QueuedVideoList
      },
      {
        name: 'popular',
        component: PopularVideoList
      }
    ];

    if (this.state.loggedIn) {
      tabs.push({
        name: 'favorites',
        component: FavoriteList
      });
    }

    return (
      <Navigator
        style={{flex: 1}}
        navigationBar={<TabBar />}
        ref={(component) => this._nav = component}
        initialRoute={tabs.find((tab) => tab.name == this.state.selectedTab)}
        initialRouteStack={tabs}
        renderScene={this._renderTab.bind(this)}
        sceneStyle={styles.navigatorScene}
        configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump }
      />
    );
  }
}

var styles = StyleSheet.create({
  navigatorScene: {
    position: 'absolute',
    left: 0,
    top: 64,
    right: 0,
    bottom: 0
  }
});

module.exports = Jukebox;
