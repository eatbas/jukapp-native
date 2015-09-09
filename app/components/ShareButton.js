var React = require('react-native');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  TouchableOpacity,
  PropTypes
} = React;

class ShareButton extends Component {
  _onShare() {
    // Share code
  }

  render() {
    return (
      <TouchableOpacity
        underlayColor="#ebeeee"
        style={styles.secondaryButton}
        onPress={this._onShare.bind(this)}>
        <Icon
          name={'fontawesome|share-alt'}
          size={30}
          color='#FF7043'
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
}

ShareButton.propTypes = {
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

module.exports = ShareButton;
