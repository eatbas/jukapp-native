var React = require('react-native');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet
} = React;

class SearchIcon extends Component {
  render() {
    return (
      <Icon
        name='fontawesome|search'
        size={20}
        color='white'
        style={styles.headerRightButtonIcon}
      />
    );
  }
}

var styles = StyleSheet.create({
  headerRightButtonIcon: {
    height: 20,
    width: 20
  }
});

module.exports = SearchIcon;
