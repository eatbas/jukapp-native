var React = require('react-native');
var FavoriteButton = require('../components/FavoriteButton');
var ShareButton = require('../components/ShareButton');
var ProgressBar = require('react-native-progress-bar');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  PropTypes,
  Dimensions
} = React;

var PROGRESS_BAR_WIDTH = Dimensions.get('window').width - 32;

class PlayingVideoListItem extends Component {
  render() {
    var video = this.props.video;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {video.title}
        </Text>
        <View style={styles.content}>
          <Image source={video.thumbnail} style={styles.thumbnail} />
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
            </View>
          </View>
          <View style={styles.actions}>
            <ShareButton video={this.props.video} />
            <FavoriteButton video={this.props.video} />
          </View>
        </View>
        <ProgressBar
          fillStyle={{backgroundColor: '#FF7043'}}
          backgroundStyle={{backgroundColor: 'gray', borderRadius: 3}}
          style={{marginTop: 10, width: PROGRESS_BAR_WIDTH}}
          progress={0.5}
        />
      </View>
    );
  }
}

PlayingVideoListItem.propTypes = {
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
    paddingBottom: 8
  },

  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },

  actions: {
    justifyContent: 'space-around'
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    height: 80
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
    fontSize: 18,
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
    height: 72,
    width: 128,
    alignSelf: 'center'
  }
});

module.exports = PlayingVideoListItem;
