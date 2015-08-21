'use strict';

var React = require('react-native');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var JukappApi = require('./JukappApi');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} = React;

var LoginView = React.createClass ({
  onLogin: function() {
    JukappApi.login(this.state.username, this.state.password)
    this.setState({loading: true});
  },

  render: function() {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.loginContainer}>
          <Text style={styles.noticeText}>
            Please login to continue
          </Text>

          <TextInput
            placeholder='Username'
            style={styles.textbox}
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize='none'
            returnKeyType='next'
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={() =>{
              this.refs.passwordInput.focus();
            }}
            onChange={(event) => {
              this.setState({
                username: event.nativeEvent.text
              });
            }}
          />

          <TextInput
            ref='passwordInput'
            placeholder='Password'
            style={styles.textbox}
            secureTextEntry={true}
            onSubmitEditing={this.onLogin}
            onChange={(event) => {
              this.setState({
                password: event.nativeEvent.text
              });
            }}
          />

          <TouchableHighlight
            underlayColor="#66BB6A"
            style={styles.button}
            onPress={this.onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: '#EEF2F2',
  },

  loginContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 250,
    flexDirection: 'column',
  },

  noticeText: {
    opacity: 1,
    color: 'rgba(0,0,0,0.87)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
  },

  textbox: {
    alignSelf: 'center',
    height: 32,
    width: 150,
    borderWidth: 1,
    borderColor: '#0f0f0f',
    borderRadius: 4,
    fontSize: 16,
    margin: 8,
    padding: 8,
  },

  button: {
    margin: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 75,
    height: 40,
    backgroundColor: '#8BC34A',
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
    opacity: 1,
    color: 'rgba(0,0,0,0.87)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});

module.exports = LoginView
