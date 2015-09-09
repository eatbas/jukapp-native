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
  render() {
    var video = this.props.video;

    var listItemContent = (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title} numberOfLines={1}>{video.title}</Text>
          <Text style={styles.subtitle}>20m</Text>
        </View>
        <View style={styles.content}>
          <Image source={video.thumbnail} style={styles.thumbnail}/>
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Icon
                name={'fontawesome|user'}
                size={20}
                color='#FF7043'
                style={styles.icon}
              />
              <Text style={styles.subtitle}>added by berk</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name={'fontawesome|eye'}
                size={20}
                color='#FF7043'
                style={styles.icon}
              />
              <Text style={styles.subtitle}>{video.playCount} views</Text>
              <View style={{width: 16}}/>
              <Icon
                name={'fontawesome|clock-o'}
                size={20}
                color='#FF7043'
                style={styles.icon}
              />
              <Text style={styles.subtitle}>3:40</Text>
            </View>
          </View>
          <FavoriteButton video={this.props.video} />
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
  container: {
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
    paddingTop: 8
  },

  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    height: 64
  },

  details: {
    flexDirection: 'column',
    paddingLeft: 8,
    justifyContent: 'space-around',
    flex: 1,
    height: 64,
    alignSelf: 'center'
  },

  detailRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  title: {
    flex: 1,
    color: '#212121',
    fontSize: 15,
    textAlign: 'left',
    paddingRight: 16
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 4
  },

  subtitle: {
    fontSize: 12,
    color: '#727272'
  },

  thumbnail: {
    height: 63,
    width: 112,
    alignSelf: 'center'
  }
});

module.exports = VideoListItem;