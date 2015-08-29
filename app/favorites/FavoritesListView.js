var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var VideoCell = require('../videos/VideoCell');
var JukappApi = require('../JukappApi');
var LoginView = require('../accounts/LoginView');

var {
  Component,
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} = React;

class FavoritesListView extends Component {
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
    this._fetchData();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  _renderRow(video) {
    return (
      <VideoCell video={video} onFavoriteToggled={this._fetchData.bind(this)} />
    );
  }

  _renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  _fetchData() {
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
      return (<LoginView onLogin={this._fetchData.bind(this)} />);
    }

    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderFooter={this._renderFooter.bind(this)}
        contentInset={{ bottom: 0, top: 40 }}
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

module.exports = FavoritesListView;
