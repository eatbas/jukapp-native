var React = require('react-native');
var JukappApi = require('../JukappApi');
var Dispatcher = require('../../Dispatcher');

var {
  Component,
  StyleSheet,
  TextInput
} = React;

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  _onSubmit() {
    JukappApi.searchVideo(this.state.query)
      .done((searchResults) => {
        Dispatcher.dispatch({
          type: 'loadSearchResults',
          query: this.state.query,
          searchResults
        });
      });
  }

  _onChange(event) {
    this.setState({
      query: event.nativeEvent.text
    });
  }

  render() {
    return (
      <TextInput
        ref={component => this._textInput = component}
        style={styles.navigatorTitleInput}
        placeholder='Search YouTube...'
        onSubmitEditing={this._onSubmit.bind(this)}
        autoFocus={true}
        onChange={this._onChange.bind(this)}
      />
    );
  }
}

var styles = StyleSheet.create({
  navigatorTitleInput: {
    backgroundColor: '#2D9BE5',
    width: 300,
    height: 32,
    marginLeft: 40,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 4
  }
});

module.exports = SearchInput;
