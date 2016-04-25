var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');
var PostSignup = require('./PostSignup');


var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} = React;

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email:  '',
      password: '',
      isLoading: false,
      error: false
    };
  }

  createUser() {
    // Turn on spinner
    this.setState({
      isLoading: true
    });

    // Using Firebase to create new user
    var that = this;
    var ref = new Firebase("https://morning-routine.firebaseio.com");
    ref.createUser({
      email    : that.state.email,
      password : that.state.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        that.setState({
          error: 'Error creating user. Try again?',
          isLoading: false 
        });
      } else {
        console.log("Successfully created user account with uid:", userData);
        // Add user to Database;
        api.addUser(userData.uid, that.state.email);
        // navigate to Dashboard
        that.props.navigator.push({
          component: PostSignup,
          passProps: {
            colorArr: that.props.colorArr,
            color: that.props.color,
            auth: userData.uid
          }
        });
      }
    });
    setTimeout(() => {
      //Afterwards, clear state for Login component
      this.setState({
        error: false,
        email: '',
        password: ''
      });
    }, 3000);
  }

  handleEmail(event) {
    this.setState({
      email: event.nativeEvent.text
    });
  }


  handlePassword(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  render() {
    // Show an error if API request fails
    var showErr = (
      this.state.error ? <Text style={[styles.updateAlert, {color: this.props.colorArr[this.props.color].link}]}> {this.state.error} </Text> : <View></View>
    );

    return (
      <View style={[styles.mainContainer, {backgroundColor: this.props.colorArr[this.props.color].bg}]}>
        <Image style={styles.logo} source={require('../Assets/morningroutineiconLRG.png')} />
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.pageText}>Email</Text>
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          autoCorrect={false}
          style={[styles.input, {backgroundColor: this.props.colorArr[this.props.color].txt}]}
          value={this.state.email}
          onChange={this.handleEmail.bind(this)} />

        <Text style={styles.pageText}>Password</Text>
        <TextInput
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry={true}
          style={[styles.input, {backgroundColor: this.props.colorArr[this.props.color].txt}]}
          value={this.state.password}
          onChange={this.handlePassword.bind(this)} />
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color='#111'
          size='large' />
        { showErr }

        <TouchableHighlight
          style={styles.button}
          onPress={this.createUser.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> SIGN UP </Text>
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
  input: {
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
  subtitle: {
    marginBottom: 25,
    fontSize: 25,
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
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: 'center'
  }
});

module.exports = Signup;