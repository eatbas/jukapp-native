'use strict';

var React = require('react-native');

var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;

var MenuItemView = React.createClass({
  _onPress: function() {
    this.props.menuActions.close();

    if (this.props.onPress) {
      this.props.onPress();
    } else {
      if (this.props.navigator.getCurrentRoutes()[0].id != this.props.scene) {
        this.props.navigator.replace({
          id: this.props.scene,
          title: this.props.title
        });
      }
    }
  },

  render: function() {
    return (
        <TouchableHighlight
          style={styles.item}
          onPress={this._onPress}
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
});

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
