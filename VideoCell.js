'use strict';

var React = require('react-native');
var Jukapp = require('./Jukapp.js');

var {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Image,
 ListView,
 TouchableHighlight,
} = React;

class VideoCell extends React.Component {

  render() {
    var video = this.props.video;
    var image = { uri: 'http://img.youtube.com/vi/' + video.youtube_id + '/default.jpg' }

    return (
      <TouchableHighlight
        underlayColor="#CFD6D6"
        style={{ marginBottom:10 }}
        onPress={() => {
          Jukapp.queueVideo(video)
        }}>

        <View style={styles.cell}>
          <Image source={image} style={styles.videoImage}/>

          <View style={styles.rowData}>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.details}>12 VIEWS</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


var styles = StyleSheet.create({

  cell: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    height: 96,
    justifyContent: 'flex-start',
  },

  rowData: {
    flexDirection: 'column',
    paddingLeft: 16,
    justifyContent: 'space-around',
    flex: 1,
  },

  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingTop: 4,
  },

  details: {
    color: '#9FA7A7',
    fontSize: 14,
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
