var React = require('react-native');

var {
  Component,
  StyleSheet,
  PropTypes,
  View,
  Text,
  TouchableHighlight
} = React;

class TabBarItem extends Component {
  render() {
    var containerStyle = [styles.tabBarItemContainer];
    var textStyle = [styles.tabBarItemText];

    if (this.props.active) {
      containerStyle.push(styles.tabBarItemContainerActive);
      textStyle.push(styles.tabBarItemTextActive);
    }

    return (
      <TouchableHighlight
        style={{flex: 1}}
        underlayColor="#F5F5F5"
        activeOpacity={0.3}
        onPress={this.props.onPress}
      >
        <View style={containerStyle}>
          <Text style={textStyle}>{this.props.title.toUpperCase()}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

TabBarItem.propTypes = {
  active: PropTypes.bool,
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired
};

var styles = StyleSheet.create({
  tabBarItemText: {
    fontWeight: 'bold'
  },

  tabBarItemTextActive: {
    color: '#33ADFF'
  },

  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tabBarItemContainerActive: {
    borderBottomColor: '#33ADFF',
    borderBottomWidth: 2
  }
});

module.exports = TabBarItem;
