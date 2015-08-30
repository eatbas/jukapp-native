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
        color='black'
        style={styles.headerRightButtonIcon}
      />
    );
  }
}

var styles = StyleSheet.create({
  headerRightButtonIcon: {
    width: 100,
    height: 20,
    marginTop: 10,
    marginLeft: 20
  }
});

module.exports = SearchIcon;
