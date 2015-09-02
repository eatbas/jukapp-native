var React = require('react-native');
var Toast = require('../components/Toast');
var VideoListItem = require('../components/VideoListItem');
var Dispatcher = require('../../Dispatcher');
var JukappApi = require('../JukappApi');
var JukappStore = require('../stores/JukappStore');

var {
  Component,
  StyleSheet,
  PropTypes,
  ListView,
  ActivityIndicatorIOS,
  View
} = React;

class VideoList extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource,
      loading: this.props.loading,
      loggedIn: JukappStore.loggedIn()
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._generateVideoRows(this.props.videos, JukappStore.getFavorites())),
      loading: nextProps.loading
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.loggedIn && nextState.loggedIn) {
      this.fetchData();
    }
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
          return favorite.youtube_id == video.youtube_id;
        });
      }

      return {
        isFavorite,
        youtubeId: video.youtube_id,
        title: video.title
      };
    });
  }

  _onPress(video) {
    JukappApi.queueVideo(video)
      .done(() => {
        this._toast.flash('Added', 'fontawesome|check');
      });
  }

  _onFavoriteToggled(video) {
    // simplify as toggleFavorite, let the api handle
    if (video.isFavorite) {
      JukappApi.unfavoriteVideo(video)
        .done(() => {
          this._toast.flash('Removed', 'fontawesome|star-o');
          this.fetchData();
        });
    } else {
      JukappApi.favoriteVideo(video)
        .done(() => {
          this._toast.flash('Favorited', 'fontawesome|star');
          this.fetchData();
        });
    }
  }

  _renderRow(video) {
    var listItemProps = {
      video,
      onFavoriteToggled: () => this._onFavoriteToggled(video)
    };

    if (this.props.action) {
      listItemProps._onPress = () => this._onPress(video);
    }

    return <VideoListItem {...listItemProps} />;
  }

  _renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listViewContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
        <Toast ref={(component) => this._toast = component} />
      </View>
    );
  }
}

VideoList.propTypes = {
  action: PropTypes.bool,
  loading: PropTypes.bool,
  onFavoriteToggled: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F2'
  },

  listViewContent: {
    justifyContent: 'center',
    padding: 10
  }
});

module.exports = VideoList;
