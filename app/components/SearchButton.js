var React = require('react-native');
var SearchIcon = require('./SearchIcon');

var {
  Component,
  StyleSheet,
  TouchableOpacity,
  View,
  PropTypes
} = React;

class SearchButton extends Component {
  render() {

    if (this.props.onPress) {
      return (
        <TouchableOpacity
          underlayColor='#33ADFF'
          activeOpacity={0.3}
          onPress={this.props.onPress}
          style={styles.rightButton}
        >
          <View>
            <SearchIcon />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.rightButton}>
          <SearchIcon />
        </View>
      );
    }

  }
}

SearchButton.propTypes = {
  onPress: PropTypes.func
};

var styles = StyleSheet.create({
  rightButton: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = SearchButton;
