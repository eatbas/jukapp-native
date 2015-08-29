var React = require('react-native');
var routes = require('./routes');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;

class MenuListItem extends Component {
  _onPress() {
    this.props.onPress(this.props.routeName);
  }

  render() {
    var route = routes[this.props.routeName];

    return (
        <TouchableHighlight
          style={styles.item}
          onPress={this._onPress.bind(this)}
          underlayColor="#ebeeee"
        >
          <View style={styles.itemContent}>
            <Icon
              name={route.icon}
              size={20}
              color='black'
              style={styles.icon}
            />
            <Text style={styles.itemTitle}>{route.title}</Text>
          </View>
        </TouchableHighlight>
    );
  }
}

MenuListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  routeName: PropTypes.string.isRequired
};

var styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    marginRight: 16
  },

  item: {
    padding: 16,
    height: 48,
    justifyContent: 'center'
  },

  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemTitle: {
    fontSize: 14
  }
});

module.exports = MenuListItem;
