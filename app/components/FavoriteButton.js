var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappApi = require('../JukappApi');
var Router = require('../navigation/Router');
var JukappStore = require('../stores/JukappStore');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  TouchableOpacity,
  PropTypes,
  View
} = React;

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: JukappStore.isFavorite(this.props.video.details.youtube_id)
    };
  }

  componentWillReceiveProps() {
    this.setState({
      isFavorite: JukappStore.isFavorite(this.props.video.details.youtube_id)
    });
  }

  fetchData() {
    JukappApi.fetchFavorites().done((favorites) => {
      Dispatcher.dispatch({
        type: 'loadFavorites',
        favorites
      });
    });
  }

  _onFavoriteToggled() {
    JukappApi.toggleFavorite(this.props.video, this.state.isFavorite)
      .done(() => {
        if (this.state.isFavorite) {
          Router._toast.flash('Removed', 'fontawesome|heart-o');
        } else {
          Router._toast.flash('Favorited', 'fontawesome|heart');
        }
        this.fetchData();
      });
  }

  render() {
    if (!JukappStore.loggedIn()) {
      return (<View/>);
    }

    return (
      <TouchableOpacity
        underlayColor="#ebeeee"
        style={styles.secondaryButton}
        onPress={this._onFavoriteToggled.bind(this)}>
        <Icon
          name={this.state.isFavorite ? 'fontawesome|heart' : 'fontawesome|heart-o'}
          size={30}
          color='#FF7043'
          style={styles.icon}
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

  icon: {
    height: 30,
    width: 30
  }

});

module.exports = FavoriteButton;
