var React = require('react-native');
var TabBarItem = require('./TabBarItem');

var {
  Component,
  StyleSheet,
  PropTypes,
  View
} = React;

class TabBar extends Component {
  _renderTabBarItems() {
    return this.props.navState.routeStack.map((route, index) => {
      var onTabChanged = () => {
        this.props.navigator.jumpTo(this.props.navState.routeStack[index]);
      };

      return (
        <TabBarItem
          key={index}
          title={route.name}
          active={this.props.navState.presentedIndex == index}
          onPress={onTabChanged}
        />
      );
    });
  }

  render() {
    return (
      <View style={styles.tabBarContainer}>
        {this._renderTabBarItems()}
      </View>
    );
  }
}

TabBar.propTypes = {
  navState: PropTypes.object,
  navigator: PropTypes.object
};

var styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 24,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'white'
  }
});

module.exports = TabBar;
