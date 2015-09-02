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
    // simplify as toggleFavorite, let the api handle
    // JukappApi.toggleFavorite(this.props.video)
    //   .done(() => {
    //     Router._toast.flash('Removed', 'fontawesome|star-o');
    //     this.fetchData();
    //   });

    if (this.props.video.isFavorite) {
      JukappApi.unfavoriteVideo(this.props.video)
        .done(() => {
          Router._toast.flash('Removed', 'fontawesome|star-o');
          this.fetchData();
        });
    } else {
      JukappApi.favoriteVideo(this.props.video)
        .done(() => {
          Router._toast.flash('Favorited', 'fontawesome|star');
          this.fetchData();
        });
    }
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="#ebeeee"
        style={styles.secondaryButton}
        onPress={this._onFavoriteToggled.bind(this)}>
        <Icon
          name={this.props.video.isFavorite ? 'fontawesome|star' : 'fontawesome|star-o'}
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
