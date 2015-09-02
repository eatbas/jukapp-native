var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var VideoList = require('../videos/VideoList');

var {
  Component,
  StyleSheet,
  Navigator,
  View,
  Text
} = React;

// var routes = {
//   inQueue:
// }

class QueuedVideoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
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
    return (
      <View style={{
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        backgroundColor: 'white'
      }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#33ADFF', borderBottomWidth: 2}}>
          <Text style={{color: '#33ADFF', fontWeight: 'bold'}}>QUEUE</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>LATEST</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>POPULAR</Text>
        </View>
      </View>
    );
  }

  _renderScene() {
    return (
      <VideoList
        videos={JukappStore.getQueuedVideos()}
        loading={this.state.loading}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this._renderTabBars()}
        <Navigator
          initialRouteStack={['inQueue', 'latest', 'popular']}
          renderScene={this._renderScene.bind(this)}
          sceneStyle={styles.navigatorScene}
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
  }
});

module.exports = QueuedVideoList;
