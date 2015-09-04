var React = require('react-native');
var JukappStore = require('../stores/JukappStore');

var {
  Component,
  StyleSheet,
  PropTypes,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  Text
} = React;

var CARD_MARGIN = 16;
var CARD_WIDTH = Dimensions.get('window').width - 16*2;
var CARD_IMAGE_HEIGHT = CARD_WIDTH * 9 / 16;

class VideoDetails extends Component {
  render() {
    var playCount;
    var video = this.props.video;

    // TODO remove this
    if (video.videoEvents) {
      var videoEvent = video.videoEvents.find((events) => events['room_id'] == JukappStore.currentRoom().id);
      if (videoEvent) playCount = videoEvent['play_count'];
    }

    return (
      <View style={styles.container} >
        <Image source={video.image} style={styles.videoImage}/>
        <View style={styles.videoDescription}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoSubtitle}>{playCount} VIEWS</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableHighlight underlayColor='#E0E0E0' onPress={() => this.props.onVideoQueued(video)}>
            <Text style={styles.actionText}>PLAY</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#E0E0E0'>
            <Text style={styles.actionText}>FAVORITE</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

VideoDetails.propTypes = {
  onVideoQueued: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: CARD_MARGIN,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius: 4,
    overflow: 'hidden'
  },

  videoDescription: {
    margin: 16,
    marginTop: 24,
    marginBottom: 8
  },

  videoTitle: {
    marginBottom: 16,
    fontSize: 24,
    opacity: 0.87
  },

  videoSubtitle: {
    fontSize: 14,
    opacity: 0.54
  },

  actionContainer: {
    flexDirection: 'row',
    margin: 8
  },

  actionText: {
    padding: 8,
    color: '#33ADFF',
    opacity: 0.87,
    fontWeight: 'bold'
  },

  videoImage: {
    width: CARD_WIDTH,
    height: CARD_IMAGE_HEIGHT
  }
});

module.exports = VideoDetails;
