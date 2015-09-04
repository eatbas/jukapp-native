var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var FavoriteButton = require('../components/FavoriteButton');
var VideoDetails = require('./VideoDetails');

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
    if (this.props.video.isFavorite != undefined) {
      return(<FavoriteButton video={this.props.video} />);
    }
  }

  render() {
    var video = this.props.video;
    var playCount = 0;

    // TODO remove this
    if (video.videoEvents) {
      var videoEvent = video.videoEvents.find((events) => events['room_id'] == JukappStore.currentRoom().id);
      if (videoEvent) playCount = videoEvent['play_count'];
    }

    if (video.selected) {
      return <VideoDetails onVideoQueued={this.props.onVideoQueued} video={video} />;
    }

    var listItemContent = (
      <View style={styles.innerCell}>
        <Image source={video.image} style={styles.videoImage}/>

        <View style={styles.rowData}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.details}>{playCount} VIEWS</Text>
        </View>
        {this.renderFavoriteButton()}
      </View>
    );

    if (this.props.onPress) {
      return (
        <TouchableHighlight underlayColor='#CFD6D6' onPress={this.props.onPress} style={styles.outerCell}>
          {listItemContent}
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight underlayColor='#CFD6D6' onPress={this.props.onPress} style={styles.outerCell}>
          {listItemContent}
        </TouchableHighlight>
      );
    }
  }
}

VideoListItem.propTypes = {
  onPress: PropTypes.func,
  onVideoQueued: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  outerCell: {
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'flex-start',
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  innerCell: {
    flexDirection: 'row',
    height: 64
  },

  rowData: {
    flexDirection: 'column',
    paddingLeft: 16,
    justifyContent: 'space-between',
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
    height: 64,
    borderRadius: 4
  }
});

module.exports = VideoListItem;
