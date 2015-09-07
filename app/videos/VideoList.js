var React = require('react-native');
var VideoListItem = require('../components/VideoListItem');
var Dispatcher = require('../../Dispatcher');
var JukappApi = require('../JukappApi');
var JukappStore = require('../stores/JukappStore');
var Router = require('../navigation/Router');

var {
  Component,
  StyleSheet,
  PropTypes,
  ListView,
  ActivityIndicatorIOS
} = React;

class VideoList extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource,
      loggedIn: JukappStore.loggedIn()
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._generateVideoRows(nextProps.videos, JukappStore.getFavorites()))
    });
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
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
    if (!this.state.loggedIn && JukappStore.loggedIn()) {
      this.fetchData();
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._generateVideoRows(this.props.videos, JukappStore.getFavorites())),
      loggedIn: JukappStore.loggedIn()
    });
  }

  _generateVideoRows(videos, favorites) {
    return videos.map((video) => {
      var isFavorite;
      if (this.state.loggedIn) {
        isFavorite = !!favorites.find((favorite) => {
          return favorite.youtubeId == video.youtubeId;
        });
      }

      return {
        isFavorite,
        title: video.title,
        youtubeId: video.youtubeId,
        playCount: video.playCount
      };
    });
  }

  _onPress(video) {
    JukappApi.queueVideo(video)
      .done(() => {
        Router._toast.flash('Added', 'fontawesome|check');
      });
  }

  _renderRow(video) {
    var listItemProps = {video};

    if (this.props.action) {
      listItemProps.onPress = () => this._onPress(video);
    }

    return <VideoListItem {...listItemProps} />;
  }

  _renderFooter() {
    if (this.props.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  render() {
    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderFooter={this._renderFooter.bind(this)}
        automaticallyAdjustContentInsets={this.props.automaticallyAdjustContentInsets}
      />
    );
  }
}

VideoList.propTypes = {
  action: PropTypes.bool,
  automaticallyAdjustContentInsets: PropTypes.bool,
  loading: PropTypes.bool,
  videos: PropTypes.array.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F2'
  },

  listViewContent: {
    justifyContent: 'center'
  }
});

module.exports = VideoList;
