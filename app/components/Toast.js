var React = require('react-native');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  LayoutAnimation
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
    if (this.state.isVisible) {
      return (
        <View
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
        </View>
      );
    } else {
      return (<View />);
    }
  }
}

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: (Dimensions.get('window').height - 200) / 2,
    bottom: (Dimensions.get('window').height - 200) / 2,
    right: (Dimensions.get('window').width - 150) / 2,
    left: (Dimensions.get('window').width - 150) / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1
  },

  round: {
    height: 150,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
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
