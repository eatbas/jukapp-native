var React = require('react-native');
var FavoriteButton = require('../components/FavoriteButton');

var {
  Icon
} = require('react-native-icons');

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
      <View style={styles.outerCell}>
        <View style={styles.heading}>
          <Text style={styles.title} numberOfLines='1'>{video.title}</Text>
          <Text style={styles.subtitle}>20m</Text>
        </View>
        <View style={styles.innerCell}>
          <Image source={image} style={styles.videoImage}/>
          <View style={styles.rowData}>
            <View style={styles.rowDetails}>
              <Icon
                name={'fontawesome|user'}
                size={20}
                color='#FF5722'
                style={styles.icon}
              />
              <Text style={styles.details}>added by berk</Text>
            </View>
            <View style={styles.rowDetails}>
              <Icon
                name={'fontawesome|eye'}
                size={20}
                color='#FF5722'
                style={styles.icon}
              />
              <Text style={styles.details}>{video.playCount} views</Text>
              <View style={{width: 16}}/>
              <Icon
                name={'fontawesome|clock-o'}
                size={20}
                color='#FF5722'
                style={styles.icon}
              />
              <Text style={styles.details}>3:40</Text>
            </View>
          </View>
          {this.renderFavoriteButton()}
        </View>
      </View>
    );

    if (this.props.onPress) {
      return (
        <TouchableHighlight underlayColor='#CFD6D6' onPress={this.props.onPress}>
          {listItemContent}
        </TouchableHighlight>
      );
    } else {
      return listItemContent;
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
    justifyContent: 'flex-start',
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    padding: 16,
    paddingBottom: 8
  },

  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  innerCell: {
    flex: 1,
    flexDirection: 'row',
    height: 64
  },

  rowData: {
    flexDirection: 'column',
    paddingLeft: 16,
    justifyContent: 'space-around',
    flex: 1
  },

  rowDetails: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  title: {
    flex: 1,
    color: '#212121',
    fontSize: 18,
    textAlign: 'left',
    paddingBottom: 8,
    paddingRight: 16
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 4
  },

  subtitle: {
    width: 30,
    color: '#727272'
  },

  details: {
    color: '#727272',
    fontSize: 12,
    textAlign: 'left'
  },

  videoImage: {
    height: 45,
    width: 80,
    alignSelf: 'center',
  }
});

module.exports = VideoListItem;
