var React = require('react-native');
var MenuItemView = require('./MenuItemView');
var JukappStore = require('../stores/JukappStore');
var JukappActions = require('../../JukappActions');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Text,
  PropTypes
} = React;

class MenuView extends Component {
  _leaveRoom() {
    JukappActions.leftRoom();
  }

  _renderMenuItems() {
    return this.props.mainRoutes.map((routeName) => {
      return (
        <MenuItemView
          routeName={routeName}
          onPress={this.props.onSceneChanged}
        />
        );
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Icon
            name='fontawesome|rss'
            size={20}
            color='black'
            style={styles.icon}
          />
          <Text style={styles.headerMainText}>{JukappStore.getCurrentRoom().name}</Text>
        </View>
        {this._renderMenuItems()}
      </View>
    );
  }
}

MenuView.propTypes = {
  mainRoutes: PropTypes.array.isRequired,
  onSceneChanged: PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 16
  },

  header: {
    padding: 16,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4F7F7'
  },

  headerMainText: {
    fontWeight: 'bold',
    fontSize: 18
  }
});

module.exports = MenuView;
