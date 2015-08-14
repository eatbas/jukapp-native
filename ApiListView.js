'use strict';

var React = require('react-native');
var Jukapp = require('./Jukapp');

var {
 StyleSheet,
 ListView,
 ActivityIndicatorIOS
} = React;

class ApiListView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      hasMore: false,
      loading: false,
    };

    this.objects = [];
  }

  componentDidMount() {
    this.refresh();
  }

  onEndReached() {
    if(this.state.hasMore)
      this.refresh()
  }

  refresh() {
    var state = this.state;

    if(state.loading)
      return;

    this.setState({
      loading: true,
    })

    Jukapp.fetch(this.props.url)
      .then((responseData) => {
        if (responseData["videos"]) {
          responseData = responseData["videos"]
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData)
        });
      })
      .done(() => {
      this.setState({
        loading: false
      })

    })
  }

  renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  render() {
    var automaticallyAdjustContentInsets = this.props.automaticallyAdjustContentInsets == null ? true : this.props.automaticallyAdjustContentInsets

    return (
      <ListView
        style={[styles.listView, this.props.style]}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this.props.renderRow}
        renderSectionHeader={this.props.renderSectionHeader}
        renderFooter={this.renderFooter.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
        automaticallyAdjustContentInsets={automaticallyAdjustContentInsets}
      />
    );
  }
}

var styles = StyleSheet.create({

  listView: {
    backgroundColor: '#EEF2F2',
  },

  listViewContent: {
    justifyContent: 'center',
  },

});


module.exports = ApiListView
