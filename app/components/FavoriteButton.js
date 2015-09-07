var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappApi = require('../JukappApi');
var Router = require('../navigation/Router');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  TouchableOpacity,
  PropTypes
} = React;

class FavoriteButton extends Component {
  fetchData() {
    JukappApi.fetchFavorites().done((favorites) => {
      Dispatcher.dispatch({
        type: 'loadFavorites',
        favorites
      });
    });
  }

  _onFavoriteToggled() {
    JukappApi.toggleFavorite(this.props.video)
      .done((favorited) => {
        if (favorited) {
          Router._toast.flash('Favorited', 'fontawesome|heart');
        } else {
          Router._toast.flash('Removed', 'fontawesome|heart-o');
        }
        this.fetchData();
      });
  }

  render() {
    return (
      <TouchableOpacity
        underlayColor="#ebeeee"
        style={styles.secondaryButton}
        onPress={this._onFavoriteToggled.bind(this)}>
        <Icon
          name={this.props.video.isFavorite ? 'fontawesome|heart' : 'fontawesome|heart-o'}
          size={20}
          color='#FF5722'
          style={styles.star}
        />
      </TouchableOpacity>
    );
  }
}

FavoriteButton.propTypes = {
  video: PropTypes.object.isRequired
};

var styles = StyleSheet.create({

  secondaryButton: {
    justifyContent: 'center',
    alignSelf: 'center'
  },

  star: {
    height: 20,
    width: 20
  }

});

module.exports = FavoriteButton;
