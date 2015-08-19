'use strict';

var React = require('react-native');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var JukappApi = require('./JukappApi');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var LoginView = React.createClass ({
  render: function() {
    return (
      <View style={styles.login}>
        <TouchableHighlight
          underlayColor="#66BB6A"
          style={styles.button}
          onPress={() => {
            JukappApi.login()
            this.setState({loading: true});
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  login: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#4CAF50',
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});

module.exports = LoginView
