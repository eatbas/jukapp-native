var React = require('react-native');
var Overlay = require('react-native-overlay');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet,
  View,
  Text
} = React;

class Toast extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.isVisible
    });
  }

  render() {
    return (
      <Overlay isVisible={this.state.isVisible}>
        <View style={styles.container}>
          <View style={styles.round}>
            <Icon
              name='fontawesome|check'
              size={50}
              color='white'
              style={styles.icon}
            />
            <Text style={styles.text}>Added</Text>
          </View>
        </View>
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
    opacity: 0.80,
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
