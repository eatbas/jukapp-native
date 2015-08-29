var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Component,
  PropTypes
} = React;

class RoomsListItem extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="#CFD6D6"
        style={{ marginBottom:10 }}
        onPress={this.props.onPress}>

        <View style={styles.cell}>
          <Text style={styles.title}>{this.props.room.name}</Text>
          <Text style={styles.details}>1234 USERS</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

RoomsListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  cell: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 6,
    height: 72,
    justifyContent: 'space-around',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 0
    },
    flex: 1
  },

  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingTop: 4,
    paddingLeft: 10
  },

  details: {
    color: '#9FA7A7',
    fontSize: 14,
    textAlign: 'left',
    paddingBottom: 4,
    paddingLeft: 10
  }
});

module.exports = RoomsListItem;
