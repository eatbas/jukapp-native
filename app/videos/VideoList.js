var React = require('react-native');
var Toast = require('../components/Toast');
var VideoListItem = require('../components/VideoListItem');
var JukappApi = require('../JukappApi');

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
      dataSource: dataSource.cloneWithRows(this.props.videos),
      loading: this.props.loading
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.videos),
      loading: nextProps.loading
    });
  }

  _onPress(video) {
    JukappApi.queueVideo(video)
      .done(() => {
        this._toast.flash('Added', 'fontawesome|check');
      });
  }

  _onFavoriteToggled(video) {
    if (video.isFavorite) {
      JukappApi.unfavoriteVideo(video)
        .done(() => {
          this._toast.flash('Removed', 'fontawesome|star-o');
        });
    } else {
      JukappApi.favoriteVideo(video)
        .done(() => {
          this._toast.flash('Favorited', 'fontawesome|star');
        });
    }

    this.props.onFavoriteToggled();
  }

  _renderRow(video) {
    if (this.props.action) {
      return (
        <VideoListItem video={video} onFavoriteToggled={() => this._onFavoriteToggled(video)} onPress={() => this._onPress(video)} />
      );
    } else {
      return (
        <VideoListItem video={video} onFavoriteToggled={() => this._onFavoriteToggled(video)} />
      );
    }
  }

  _renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Toast ref={(component) => this._toast = component} />
        <ListView
          contentContainerStyle={styles.listViewContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
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
