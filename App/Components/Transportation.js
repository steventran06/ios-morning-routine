var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  PickerIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

class Transportation extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      state: '',
      isLoading: false,
      error: false
    };
  }

  addDestinationAddress() {
    console.log(this.props);
  }


  handleAddress(event) {
    this.setState({
      address: event.nativeEvent.text
    });
  }

  handleCity(event) {
    this.setState({
      city: event.nativeEvent.text
    });
  }


  render() {
    
    // Show an error if API request fails
    var showErr = (
      this.state.error ? <Text style={[styles.updateAlert, {color: this.props.colorArr[this.props.color].link}]}> {this.state.error} </Text> : <View></View>
    );

    var PickerItemIOS = PickerIOS.Item;
    var cars = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    return (
      <View style={[styles.mainContainer, {backgroundColor: this.props.colorArr[this.props.color].bg}]}>

        <Text style={styles.title}>Where do you head to everyday?</Text>

        <Text style={styles.pageText}>Destination Address</Text>
        <TextInput
          placeholder='Home Address'
          autoCapitalize='none'
          style={[styles.signupInput, {backgroundColor: this.props.colorArr[this.props.color].txt}]}
          value={this.state.home}
          onChange={this.handleAddress.bind(this)} />

        <Text style={styles.pageText}>City</Text>
        <TextInput
          placeholder='City'
          autoCapitalize='none'
          style={[styles.signupInput, {backgroundColor: this.props.colorArr[this.props.color].txt}]}
          value={this.state.work}
          onChange={this.handleCity.bind(this)} />

        <PickerIOS
          selectedValue={this.state.state}
          onValueChange={(state) => this.setState({state})}>
          {cars.map((state) => (
            <PickerItemIOS
              key={state}
              value={state}
              label={state} />
          )
        )}
        </PickerIOS>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color='#111'
          size='large' />
        { showErr }

        <TouchableHighlight
          style={styles.button}
          onPress={this.addDestinationAddress.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> TEST </Text>
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
  signupInput: {
    paddingLeft: 5,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  updateAlert: {
    textAlign: 'center'
  },
  pageText: {
    color: '#fff'
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

module.exports = Transportation;