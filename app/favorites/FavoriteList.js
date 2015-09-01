var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var Login = require('../accounts/Login');
var VideoList = require('../videos/VideoList');

var {
  Component
} = React;

class FavoriteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: JukappStore.loggedIn(),
      loading: true
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
    this.fetchData();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  fetchData() {
    JukappApi.fetchFavorites().done((favorites) => {
      Dispatcher.dispatch({
        type: 'loadFavorites',
        favorites
      });
    });
  }

  _onChange() {
    this.setState({
      loggedIn: JukappStore.loggedIn(),
      loading: false
    });
  }

  render() {
    if(!this.state.loggedIn) {
      return (<Login onLogin={this.fetchData.bind(this)} />);
    }

    return (
      <VideoList
        videos={JukappStore.getFavorites()}
        loading={this.state.loading}
        onFavoriteToggled={this.fetchData.bind(this)}
        action={true}
      />
    );
  }
}

module.exports = FavoriteList;
