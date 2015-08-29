'use strict';

var React = require('react-native');
var Router = require('../navigation/Router');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;

class MenuItemView extends Component {
  _onPress() {
    this.props.menuActions.close();

    if (this.props.onPress) {
      this.props.onPress();
    } else {
      if (Router.currentRoute != this.props.scene) {
        Router.push(this.props.scene, {});
      }
    }
  }

  render() {
    return (
        <TouchableHighlight
          style={styles.item}
          onPress={this._onPress.bind(this)}
          underlayColor="#ebeeee"
        >
          <View style={styles.itemContent}>
            <Icon
              name={this.props.icon}
              size={20}
              color='black'
              style={styles.icon}
            />
            <Text style={styles.itemTitle}>{this.props.title}</Text>
          </View>
        </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    marginRight: 16,
  },

  item: {
    padding: 16,
    height: 48,
    justifyContent: 'center',
  },

  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemTitle: {
    fontSize: 14,
  },
});

module.exports = MenuItemView
