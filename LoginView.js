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
  TextInput,
  ActivityIndicatorIOS
} = React;

var LoginView = React.createClass ({
  getInitialState: function() {
    return {
      loading: false,
      loginError: false,
    };
  },

  onLoginRequested: function() {
    JukappApi.login(this.state.username, this.state.password)
     .catch((response) => {
        this.setState({loginError: true});
      })
      .done(() => {
        this.setState({loading: false});

        if (JukappStore.isLoggedIn()) {
          this.props.onLogin();
        }
      });

    this.setState({loading: true});
  },

  render: function() {
    var header = null

    if (this.state.loading) {
      header = (
        <View style={styles.headerContainer}>
          <Text style={[styles.noticeText, {paddingRight: 16}]}>
            Trying to login
          </Text>
          <ActivityIndicatorIOS />
        </View>
      )
    } else if (this.state.loginError) {
      header = (
        <View style={styles.headerContainer}>
          <Text style={styles.noticeText}>
            Login failed
          </Text>
        </View>
      )
    } else {
      header = (
        <View style={styles.headerContainer}>
          <Text style={styles.noticeText}>
            Please login to continue
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.page}>
        <View style={styles.loginContainer}>

          {header}

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
            onSubmitEditing={this.onLoginRequested}
            onChange={(event) => {
              this.setState({
                password: event.nativeEvent.text
              });
            }}
          />

          <TouchableHighlight
            underlayColor="#66BB6A"
            style={styles.button}
            onPress={this.onLoginRequested}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  page: {
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

  headerContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
  },

  noticeText: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: 'rgba(0,0,0,0.87)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});

module.exports = LoginView
