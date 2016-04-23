var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');
var Signup = require('./Signup');
var Home = require('./Home');
// var TabBar = require('./TabBar');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} = React;


class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email:  '',
      password: '',
      color: 4,
      isLoading: false,
      error: false,
      colorArr: [
        {bg: '#E8B376', txt: '#f0cfa8', link: '#7a76e8'},
        {bg: '#FFD381', txt: '#ffe8bc', link: '#9481ff'},
        {bg: '#FFBA8E', txt: '#ffdec9', link: '#8e9bff'},
        {bg: '#E89276', txt: '#f0baa8', link: '#7693e8'},
        {bg: '#FF8E81', txt: '#ffc3bc', link: '#81b3ff'}
      ]
    };
  }

  componentWillMount() {
    var date = new Date();
    var currentTime = (date.getHours()* 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds());
    var that = this;

    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      api.getSunriseTime(lat, lng)
      .then(function(data) {
        var utcSunrise = api.convertTime(data.results.sunrise);
        api.getTimezone(lat, lng)
        .then(function(timezone) {
          var localSunrise = utcSunrise + timezone.rawOffset;
          var timeFromSunrise = localSunrise - currentTime;
          if (Math.abs(timeFromSunrise) < 1800) {
            that.setState({
              color: 1
            });
          } else if (timeFromSunrise > 1800 && timeFromSunrise < 18000) {
            that.setState({
              color: 0
            });
          } else if (timeFromSunrise < -1800 && timeFromSunrise > -5400) {
            that.setState({
              color: 2
            });

          } else if (timeFromSunrise < -5400 && timeFromSunrise > -9000) {
            that.setState({
              color: 3
            });
          }
        });
        
      });
    });
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

  loggingIn() {
    // update our indicatorIOS spinner
    this.setState({
      // will toggle on Activity Indicator when true;
      isLoading: true
    });
    // Using Firebase to authenticate
    var that = this;
    var ref = new Firebase("https://morning-routine.firebaseio.com");
    ref.authWithPassword({
      email: that.state.email,
      password: that.state.password
    }, function(error, authData) {
      if (error) {
        that.setState({
          isLoading: false
        });
        console.log("Login Failed!", error);
        // Shows error on client if login fails
        that.setState({
          error: 'Login failed'
        });

      } else {
        console.log("Authenticated successfully with payload:", authData);
        // navigate to Home
        that.props.navigator.push({
          component: Home,
          passProps: {
            userInfo: authData
          }
        });
        that.setState({
          isLoading: false
        });
      }
    });

    setTimeout(() => {
      //Afterwards, clear state for login component
      this.setState({
        error: false,
        email: '',
        password: ''
      });
    }, 3000);
  }


  goToSignup() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Signup,
      passProps: {
        colorArr: this.state.colorArr,
        color: this.state.color
      }
    });
  }

  render() {
    // Show an error if API request fails
    var showErr = (
      this.state.error ? <Text style={[styles.alertText, {color: this.state.colorArr[this.state.color].link}]}> {this.state.error} </Text> : <View></View>
    );

    return (
        <View style={[styles.mainContainer, {backgroundColor: this.state.colorArr[this.state.color].bg}]}>
          <Image style={styles.logo} source={require('../Assets/morningroutineiconLRG.png')} />
          <Text style={styles.title}>Morning Routine</Text>

          <Text style={styles.pageText}>Email</Text>
          <TextInput
            placeholder='Email'
            autoCapitalize='none'
            style={[styles.loginInput, {backgroundColor: this.state.colorArr[this.state.color].txt}]}
            value={this.state.email}
            onChange={this.handleEmail.bind(this)} />

          <Text style={styles.pageText}>Password</Text>
          <TextInput
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry={true}
            style={[styles.loginInput, {backgroundColor: this.state.colorArr[this.state.color].txt}]}
            value={this.state.password}
            onChange={this.handlePassword.bind(this)} />
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color='#111'
            size='large' />
          { showErr }

          <TouchableHighlight
            style={styles.button}
            onPress={this.loggingIn.bind(this)}
            underlayColor='white' >
              <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableHighlight>

          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableHighlight
            onPress={this.goToSignup.bind(this)}
            underlayColor='white' >
              <Text style={[styles.linkText, {color: this.state.colorArr[this.state.color].link}]}>Sign up now!</Text>
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
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginInput: {
    paddingLeft: 5,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  linkText: {
    fontSize: 15,
    textAlign: 'center',
  },
  alertText: {
    fontSize: 15
  },
  pageText: {
    color: '#fff'
  },
  title: {
    marginBottom: 10,
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
  signupText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  loadingImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 100
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: 'center'
  }
});

module.exports = Login;
