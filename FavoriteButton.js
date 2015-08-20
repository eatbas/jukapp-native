'use strict';

var React = require('react-native');
var JukappApi = require('./JukappApi');

var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  TouchableHighlight,
} = React;

var FavoriteButton = React.createClass ({

  getInitialState: function() {
    return {
      isFavorite: this.props.isFavorite,
    };
  },

  handleButtonPress: function() {
    var video = this.props.video
    this.state.isFavorite ? JukappApi.unfavoriteVideo(video) : JukappApi.favoriteVideo(video);
  },

  componentWillReceiveProps: function() {
    this.setState({
      isFavorite: this.props.isFavorite
    });
  },

  render: function() {
    var icon = this.state.isFavorite ? 'fontawesome|star' : 'fontawesome|star-o';

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
});

var styles = StyleSheet.create({

  secondaryButton: {
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
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

module.exports = FavoriteButton
