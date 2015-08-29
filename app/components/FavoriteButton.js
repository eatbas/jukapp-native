var React = require('react-native');
var JukappApi = require('../JukappApi');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  TouchableHighlight,
  PropTypes
} = React;

class FavoriteButton extends Component {

  handleButtonPress() {
    var video = this.props.video;
    video.isFavorite ? JukappApi.unfavoriteVideo(video) : JukappApi.favoriteVideo(video);

    this.props.onFavoriteToggled();
  }

  render() {
    var icon = this.props.video.isFavorite ? 'fontawesome|star' : 'fontawesome|star-o';

    return (
      <TouchableHighlight
        underlayColor="#ebeeee"
        style={styles.secondaryButton}
        onPress={this.handleButtonPress}>
        <Icon
          name={icon}
          size={20}
          color='black'
          style={styles.star}
        />
      </TouchableHighlight>
    );
  }
}

FavoriteButton.propTypes = {
  onFavoriteToggled: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired
};

var styles = StyleSheet.create({

  secondaryButton: {
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16
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
  }

});

module.exports = FavoriteButton;
