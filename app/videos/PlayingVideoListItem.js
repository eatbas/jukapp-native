var React = require('react-native');
var FavoriteButton = require('../components/FavoriteButton');
var ShareButton = require('../components/ShareButton');
var Slider = require('react-native-slider');
var LargeNumberFormatter = require('../utilities/LargeNumberFormatter');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  PropTypes
} = React;

class PlayingVideoListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: this.props.video.statistics.current_time
    };
  }

  componentDidMount() {
    this.setInterval();
  }

  componentWillUnmount() {
    clearInterval(this.setInterval);
  }

  setInterval() {
    // this leaks, don't increment if paused
    setInterval(() => {
      if (this.props.video.statistics.status == 'playing') {
        this.setState({currentTime: this.state.currentTime + 1});
      }
    }, 1000);
  }

  integerToDuration(value) {
    var minutes = ~~(value/60);
    var seconds = value%60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  render() {
    var video = this.props.video;
    var thumbnail = { uri: 'http://img.youtube.com/vi/' + video.details.youtube_id + '/hqdefault.jpg' };

    var durationString = this.integerToDuration(video.details.duration);
    var currentTimeString = this.integerToDuration(this.state.currentTime);

    console.log(video);

    if (video.statistics.queued_by) {
      var addedBy = (
        <View style={styles.detailRow}>
          <Icon
            name={'fontawesome|user'}
            size={20}
            color='#FF7043'
            style={styles.icon}
          />
          <Text style={styles.subtitle}>added by {video.statistics.queued_by.username}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.title}>
          {video.details.title}
        </Text>
        <View style={styles.content}>
          <Image source={thumbnail} style={styles.thumbnail} />
          <View style={styles.details}>
            {addedBy}
            <View style={styles.detailRow}>
              <Icon
                name={'fontawesome|eye'}
                size={20}
                color='#FF7043'
                style={styles.icon}
              />
              <Text style={styles.subtitle}>{LargeNumberFormatter.format(video.details.view_count)} views</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <ShareButton video={this.props.video} />
            <FavoriteButton video={this.props.video} />
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.subtitle}>{currentTimeString}</Text>
          <Slider
            style={styles.slider_container}
            trackStyle={styles.slider_track}
            thumbStyle={styles.slider_thumb}
            minimumTrackTintColor='#FF7043'
            thumbTouchSize={{width: 0, height: 0}}
            value={this.state.currentTime/video.details.duration}
          />
          <Text style={styles.subtitle}>{durationString}</Text>
        </View>
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
    height: 85
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
  },

  slider_container: {
    height: 20,
    flex: 1,
    marginRight: 8,
    marginLeft: 8
  },

  slider_track: {
    height: 5
  },

  slider_thumb: {
    width: 14,
    height: 14,
    backgroundColor: '#3F51B5',
    borderRadius: 7
  }
});

module.exports = PlayingVideoListItem;
