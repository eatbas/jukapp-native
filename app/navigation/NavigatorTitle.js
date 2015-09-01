var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  PropTypes
} = React;

class NavigatorTitle extends Component {
  render() {
    return (
      <Text style={styles.navigatorTitle}>{this.props.title}</Text>
    );
  }
}

NavigatorTitle.propTypes = {
  title: PropTypes.string.isRequired
};

var styles = StyleSheet.create({
  navigatorTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

module.exports = NavigatorTitle;
