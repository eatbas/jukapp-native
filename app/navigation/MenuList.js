var React = require('react-native');
var MenuListItem = require('./MenuListItem');
var JukappStore = require('../stores/JukappStore');
var Dispatcher = require('../../Dispatcher');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Text,
  PropTypes,
  TouchableHighlight
} = React;

class MenuList extends Component {

  _leaveRoom() {
    Dispatcher.dispatch({
      type: 'leaveRoom'
    });
  }

  _renderMenuItems() {
    return this.props.mainRoutes.map((routeName) => {
      return (
        <MenuListItem
          routeName={routeName}
          key={routeName}
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
          <Text style={styles.headerMainText}>{JukappStore.currentRoom().name}</Text>
        </View>
        <View style={styles.content}>
          {this._renderMenuItems()}
        </View>
        <View style={styles.footer}>
          <TouchableHighlight
            style={styles.footerButton}
            underlayColor="gray"
            activeOpacity={0.3}
            onPress={this._leaveRoom}
          >
              <Text style={styles.footerButtonText}>Leave Room</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

MenuList.propTypes = {
  mainRoutes: PropTypes.array.isRequired,
  onSceneChanged: PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },

  content: {
    flex: 1
  },

  footer: {
    height: 48,
    width: 250,
    justifyContent: 'center',
    backgroundColor: 'gray'
  },

  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  footerButtonText: {
    fontSize: 18,
    fontWeight: 'bold'
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

module.exports = MenuList;
