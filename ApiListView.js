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
      hasMore: true,
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

    Jukapp.fetch('/favorites')
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData,)
        });
      })
      .done(() => {
      this.setState({
        loading: false
      })

    })
  }


  onDataArrived(json) {
    for (var key in json) {
      break
    }

    var payload = json[key]

    this.objects = this.objects.concat(payload)

    var hasMore = this.state.hasMore

    if(payload.length < this.props.batchSize) {
      hasMore = false
    }
    this.setState({
      hasMore: hasMore,
      dataSource: this.state.dataSource.cloneWithRows(this.objects)
    })
  }


  renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  render() {
    return (
      <ListView
        style={[styles.listView, this.props.style]}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this.props.renderRow}
        renderSectionHeader={this.props.renderSectionHeader}
        renderFooter={this.renderFooter.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
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
