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

    var dataSource = new ListView.DataSource({rowHasChanged: () => true});

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
      dataSource: this.state.dataSource.cloneWithRows(nextProps.videos)
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
      dataSource: this.state.dataSource.cloneWithRows(this.props.videos),
      loggedIn: JukappStore.loggedIn()
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
        renderRow={this.props.renderRow || this._renderRow.bind(this)}
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
  renderRow: PropTypes.func,
  videos: PropTypes.array.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F2',
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  listViewContent: {
    justifyContent: 'center'
  }
});

module.exports = VideoList;
