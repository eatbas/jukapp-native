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
  TouchableHighlight,
  PropTypes,
  View
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

    if (this.props.video.isFavorite == undefined) {
      return (<View />);
    }

    return (
      <TouchableHighlight
        underlayColor="#ebeeee"
        style={styles.secondaryButton}
        onPress={this._onFavoriteToggled.bind(this)}>
        <Icon
          name={this.props.video.isFavorite ? 'fontawesome|heart' : 'fontawesome|heart-o'}
          size={20}
          color='black'
          style={styles.star}
        />
      </TouchableHighlight>
    );
  }
}

FavoriteButton.propTypes = {
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
    width: 40
  }

});

module.exports = FavoriteButton;
