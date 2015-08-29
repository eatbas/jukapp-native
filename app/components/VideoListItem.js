var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var FavoriteButton = require('../components/FavoriteButton');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  PropTypes
} = React;

class VideoListItem extends Component {

  renderFavoriteButton() {
    if (!JukappStore.loggedIn()) {
      return;
    }

    return(<FavoriteButton video={this.props.video} onFavoriteToggled={this.props.onFavoriteToggled} />);
  }

  render() {
    var video = this.props.video;
    var playCount = 0;

    if (video['video_events']) {
      var videoEvent = video['video_events'].find((events) => events['room_id'] == JukappStore.currentRoom().id);
      if (videoEvent) playCount = videoEvent['play_count'];
    }

    var image = { uri: 'http://img.youtube.com/vi/' + video.youtube_id + '/default.jpg' };

    return (
      <TouchableHighlight
        underlayColor='#CFD6D6'
        style={{ marginBottom:10 }}
        onPress={() => {
          JukappApi.queueVideo(video);
        }}>

        <View style={styles.cell}>
          <Image source={image} style={styles.videoImage}/>

          <View style={styles.rowData}>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.details}>{playCount} VIEWS</Text>
          </View>

          {this.renderFavoriteButton()}
        </View>
      </TouchableHighlight>
    );
  }
}

VideoListItem.propTypes = {
  onFavoriteToggled: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired
};

var styles = StyleSheet.create({

  cell: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    height: 96,
    justifyContent: 'flex-start',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  rowData: {
    flexDirection: 'column',
    paddingLeft: 16,
    justifyContent: 'space-around',
    flex: 1
  },

  title: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingTop: 4
  },

  details: {
    color: '#9FA7A7',
    fontSize: 12,
    textAlign: 'left',
    paddingBottom: 4
  },

  videoImage: {
    alignSelf: 'flex-start',
    width: 64,
    height: 64
  }
});

module.exports = VideoListItem;
