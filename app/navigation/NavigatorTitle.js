var React = require('react-native');

var {
  Component,
  StyleSheet,
  View,
  Navigator,
  Text,
  PropTypes
} = React;

var {
  NavigationBar
} = Navigator;

class NavigatorTitle extends Component {
  render() {
    return (
      <View style={styles.navigatorTitleContainer}>
        <Text style={styles.navigatorTitle}>{this.props.route.title}</Text>
      </View>
    );
  }
}

NavigatorTitle.propTypes = {
  route: PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  navigatorTitleContainer: {
    height: NavigationBar.Styles.General.NavBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },

  navigatorTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

module.exports = NavigatorTitle;
