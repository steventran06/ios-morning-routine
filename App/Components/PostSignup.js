var React = require('react-native');
var HomeAddress = require('./HomeAddress');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} = React;

class PostSignup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      state: '',
      isLoading: false,
    };
  }

  sayYes() {
    console.log(this.props);
    var that = this;
    that.props.navigator.push({
      title: 'Home',
      component: HomeAddress,
      passProps: {
        colorArr: that.props.colorArr,
        color: that.props.color,
        auth: that.props.auth
      }
    });
  }

  sayNo() {
    console.log(this.props);
  }


  render() {

    return (
      <View style={[styles.mainContainer, {backgroundColor: this.props.colorArr[this.props.color].bg}]}>

        <Text style={styles.title}>Before we start, would you like to put in your daily commute information?</Text>

        <TouchableHighlight
          style={styles.button}
          onPress={this.sayYes.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> Yes </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.sayNo.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> No </Text>
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
  title: {
    marginBottom: 15,
    fontSize: 30,
    textAlign: 'center',
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
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#022c3d',
    padding: 10,
    fontSize: 20
  }
});

module.exports = PostSignup;