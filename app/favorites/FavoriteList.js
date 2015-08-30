var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var VideoListItem = require('../components/VideoListItem');
var JukappApi = require('../JukappApi');
var Login = require('../accounts/Login');

var {
  Component,
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} = React;

class FavoriteList extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: dataSource.cloneWithRows(JukappStore.getFavorites()),
      loggedIn: JukappStore.loggedIn(),
      loading: true
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
    this.fetchData();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  _renderRow(video) {
    return (
      <VideoListItem video={video} onFavoriteToggled={this.fetchData.bind(this)} />
    );
  }

  _renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  fetchData() {
    JukappApi.fetchFavorites().done((favorites) => {
      Dispatcher.dispatch({
        type: 'loadFavorites',
        favorites
      });
    });
  }

  _onChange() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getFavorites()),
      loggedIn: JukappStore.loggedIn(),
      loading: false
    });
  }

  render() {
    if(!this.state.loggedIn) {
      return (<Login onLogin={this.fetchData.bind(this)} />);
    }

    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderFooter={this._renderFooter.bind(this)}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EEF2F2'
  },

  listViewContent: {
    justifyContent: 'center'
  }
});

module.exports = FavoriteList;
