var React = require('react-native');
var Overlay = require('react-native-overlay');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Text,
  Animated
} = React;

class Toast extends Component {

  constructor(props) {
    super(props);

    this.state = this._defaultState();
  }

  flash(text, icon) {
    var appearAnimation = Animated.timing(
      this.state.opacity,
      {
        toValue: 0.85,
        duration: 200
      }
    );

    var disappearAnimation = Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 800,
        delay: 300
      }
    );

    Animated.sequence([appearAnimation, disappearAnimation])
      .start(() => {
        this.setState(this._defaultState());
      });

    this.setState({
      isVisible: true,
      text,
      icon
    });
  }

  _defaultState() {
    return {
      opacity: new Animated.Value(0),
      isVisible: false
    };
  }

  render() {
    return (
      <Overlay isVisible={this.state.isVisible}>
        <Animated.View
          style={styles.container}>
          <Animated.View style={[
            styles.round,
            {opacity: this.state.opacity}
          ]}>
            <Icon
              name={this.state.icon}
              size={50}
              color='white'
              style={styles.icon}
            />
            <Text style={styles.text}>{this.state.text}</Text>
          </Animated.View>
        </Animated.View>
      </Overlay>
    );
  }
}

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
