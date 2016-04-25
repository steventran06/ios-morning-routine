var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

class CheckInfo extends React.Component{
  constructor(props) {
    super(props);

  }

  goToDashboard() {
    var leaveTime = api.convertTimeToSeconds(this.props.arrivalTime.value - this.props.duration.value);
    console.log(leaveTime);
    // that.props.navigator.push({
    //   title: 'CheckInfo',
    //   component: CheckInfo,
    //   passProps: {
    //     colorArr: this.props.colorArr,
    //     color: this.props.color,
    //     auth: this.props.auth,
    //     home: this.props.home,
    //     destination: this.props.destination,
    //     duration: data.rows[0].elements[0].duration.text
    //   }
    // });

  }

  render() {

    var linkColor = {color: this.props.colorArr[this.props.color].link};
    return (
      <View style={[styles.mainContainer, {backgroundColor: this.props.colorArr[this.props.color].bg}]}>
      <Text style={styles.title}>Check your data:</Text>

      <Text style={[styles.pageText, linkColor]}>Home Address:</Text><Text style={styles.pageText}>{this.props.home.address}</Text>
      <Text style={[styles.pageText, linkColor]}>Home City:</Text><Text style={styles.pageText}>{this.props.home.city}</Text>
      <Text style={[styles.pageText, linkColor]}>Home State:</Text><Text style={styles.pageText}>{this.props.home.state}</Text>
      <Text style={[styles.pageText, linkColor]}>Destination Address:</Text><Text style={styles.pageText}>{this.props.destination.address}</Text>
      <Text style={[styles.pageText, linkColor]}>Destination City:</Text><Text style={styles.pageText}>{this.props.destination.city}</Text>
      <Text style={[styles.pageText, linkColor]}>Destination State:</Text><Text style={styles.pageText}>{this.props.destination.state}</Text>
      <Text style={[styles.pageText, linkColor]}>Traveling by:</Text><Text style={styles.pageText}>{this.props.transportation}</Text>
      <Text style={[styles.pageText, linkColor]}>Travel Time:</Text><Text style={styles.pageText}>{this.props.duration.text}</Text>
      <Text style={[styles.pageText, linkColor]}>Arriving by:</Text><Text style={styles.pageText}>{this.props.arrivalTime.text}</Text>
      <Text style={[styles.pageText, linkColor]}>Leave by:</Text><Text style={styles.pageText}>{this.props.leaveTime.text}</Text>

      <TouchableHighlight
        style={styles.button}
        onPress={this.goToDashboard.bind(this)}
        underlayColor='white' >
          <Text style={styles.buttonText}> Looks good! </Text>
      </TouchableHighlight>

      </View>
    )
  }
}

// stylesheet
var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  updateAlert: {
    textAlign: 'center'
  },
  title: {
    marginBottom: 15,
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  pageText: {
    color: '#fff'
  },
  button: {
    height: 45,
    width: 200,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#022c3d',
    padding: 10,
    fontSize: 20
  }
});

module.exports = CheckInfo;