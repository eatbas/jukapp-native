var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
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
    if (this.props.video.isFavorite != undefined) {
      return(<FavoriteButton video={this.props.video} />);
    }
  }

  render() {
    var video = this.props.video;
    var image = { uri: 'http://img.youtube.com/vi/' + video.youtubeId + '/default.jpg' };

    var listItemContent = (
      <View style={styles.innerCell}>
        <Image source={image} style={styles.videoImage}/>

        <View style={styles.rowData}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.details}>{video.playCount} VIEWS</Text>
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
        <View style={styles.outerCell}>
          {listItemContent}
        </View>
      );
    }
  }
}

VideoListItem.propTypes = {
  onPress: PropTypes.func,
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
