var React = require('react-native');
var VideoListItem = require('./VideoListItem');
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
    var videos = videos.map((video, index) => {
      var isFavorite;
      if (this.state.loggedIn) {
        isFavorite = !!favorites.find((favorite) => {
          return favorite.youtube_id == video.youtube_id;
        });
      }

      return {
        isFavorite,
        title: video.title,
        youtubeId: video.youtube_id,
        videoEvents: video.video_events,
        image: { uri: 'http://img.youtube.com/vi/' + video.youtube_id + '/hqdefault.jpg' },
        selected: this.selectedRow == index
      };
    });

    return videos;
  }

  _onVideoQueued(video) {
    JukappApi.queueVideo(video)
      .done(() => {
        Router._toast.flash('Added', 'fontawesome|check');
      });
  }

  _onPress(rowId) {
    this.selectedRow = rowId;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._generateVideoRows(this.props.videos, JukappStore.getFavorites()))
    });
  }

  _renderRow(video, sectionId, rowId) {
    var listItemProps = {video};

    if (this.props.action) {
      listItemProps.onPress = () => this._onVideoQueued(video);
    } else {
      listItemProps.onPress = () => this._onPress(rowId);
    }

    return <VideoListItem onVideoQueued={this._onVideoQueued.bind(this)} {...listItemProps} />;
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
      />
    );
  }
}

VideoList.propTypes = {
  action: PropTypes.bool,
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
