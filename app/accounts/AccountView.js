var React = require('react-native');
var JukappActions = require('../../JukappActions');
var JukappStore = require('../stores/JukappStore');
var LoginView = require('./LoginView');

var {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;

class AccountView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: JukappStore.isLoggedIn()
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      isLoggedIn: JukappStore.isLoggedIn()
    });
  }

  render() {
    if(!this.state.isLoggedIn) {
      return (<LoginView onLogin={this._onChange.bind(this)} />);
    }

    return (
      <View style={styles.container} >
        <Text>Logged in as {JukappStore.getUser().username}</Text>
        <TouchableHighlight
          underlayColor="#66BB6A"
          style={styles.button}
          onPress={() => {
            JukappActions.loggedOut();
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F2',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    margin: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  buttonText: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  }
});

module.exports = AccountView;
