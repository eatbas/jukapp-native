'use strict';

var React = require('react-native');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var JukappApi = require('./JukappApi');
var FavoriteButton = require('./FavoriteButton');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

var VideoCell = React.createClass ({

  renderFavoriteButton: function() {
    if (!JukappStore.isLoggedIn()) {
      return;
    }

    var video = this.props.video

    return(<FavoriteButton isFavorite={JukappStore.isFavoriteVideo(video)} video={video} />);
  },

  render: function() {
    var video = this.props.video;
    var playCount;

    if (video["video_events"]) {
      var videoEvent = video["video_events"].find((events) => events["room_id"] == JukappStore.getCurrentRoom().id);
      if (videoEvent) playCount = videoEvent["play_count"];
    }

    if (!playCount) {
      playCount = 0;
    }

    var image = { uri: 'http://img.youtube.com/vi/' + video.youtube_id + '/default.jpg' }
    var secondaryButton = this.renderFavoriteButton();

    return (
      <TouchableHighlight
        underlayColor="#CFD6D6"
        style={{ marginBottom:10 }}
        onPress={() => {
          JukappApi.queueVideo(video)
        }}>

        <View style={styles.cell}>
          <Image source={image} style={styles.videoImage}/>

          <View style={styles.rowData}>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.details}>{playCount} VIEWS</Text>
          </View>

          {secondaryButton}
        </View>
      </TouchableHighlight>
    );
  }
});

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

  secondaryButton: {
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },

  star: {
    height: 40,
    width: 40,
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
    flex: 1,
  },

  title: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingTop: 4,
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
  },

});

module.exports = VideoCell
