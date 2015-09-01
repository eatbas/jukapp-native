var React = require('react-native');
var Overlay = require('react-native-overlay');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  PropTypes,
  View,
  Text,
  Animated
} = React;

class Toast extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      opacity: new Animated.Value(0.8)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          friction: 1,
          delay: 300
        }
      ).start(() => {
        this.props.onDismissed();
        this.setState({opacity: new Animated.Value(0.8)});
      });
    }

    this.setState({
      isVisible: nextProps.show
    });
  }

  render() {
    return (
      <Overlay isVisible={this.state.isVisible}>
        <Animated.View
          style={[
            styles.container,
            {opacity: this.state.opacity}
          ]}>
          <View style={styles.round}>
            <Icon
              name='fontawesome|check'
              size={50}
              color='white'
              style={styles.icon}
            />
            <Text style={styles.text}>Added</Text>
          </View>
        </Animated.View>
      </Overlay>
    );
  }
}

Toast.propTypes = {
  onDismissed: PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  round: {
    height: 150,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20
  },

  icon: {
    height: 50,
    width: 50
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  }
});

module.exports = Toast;
