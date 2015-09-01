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
    JukappApi.queueVideo(video);
    this.setState({showToast: true});
  }

  _onDismissed() {
    this.setState({showToast: false});
  }

  _renderRow(video) {
    if (this.props.action) {
      return (
        <VideoListItem video={video} onFavoriteToggled={this.props.onFavoriteToggled} onPress={() => this._onPress(video)} />
      );
    } else {
      return (
        <VideoListItem video={video} onFavoriteToggled={this.props.onFavoriteToggled} />
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
        <Toast show={this.state.showToast} onDismissed={this._onDismissed.bind(this)} />
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
