var React = require('react-native');
var Router = require('./Router');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  TouchableOpacity
} = React;

class MenuButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => Router.sideMenu.toggleMenu()}
        activeOpacity={0.3}
        underlayColor='#33ADFF'
        style={styles.headerLeftView}
      >
        <Icon
          name='fontawesome|bars'
          size={20}
          color='white'
          style={styles.headerLeftButtonIcon}
        />
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  headerLeftView: {
    width: 60
  },

  headerLeftButtonIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft: 20
  }
});

module.exports = MenuButton;
