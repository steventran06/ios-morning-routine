var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');
var CheckInfo = require('./CheckInfo');

var {
  View,
  Text,
  DatePickerIOS,
  StyleSheet,
  PickerIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

class Transportation extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      transportation: 'Driving',
      arrivalTime: null,
      date: new Date(),
      error: false,
      duration: ''
    };
  }

  addTransportation() {
    var arrivalTime = api.buildArrivalTime(this.state.date);
    console.log('arrival time is:', arrivalTime);

    var that = this;
    api.getTimeTravel(that.props.home, that.props.destination, that.state.transportation)
      .then(function(data) {
        var leaveTime = api.convertSecondsToTime(arrivalTime.value - data.rows[0].elements[0].duration.value);
        console.log('leave time is:', leaveTime);
        api.addUserDetails(that.props.auth, that.props.home, that.props.destination, that.state.transportation, data.rows[0].elements[0].duration, arrivalTime, leaveTime);

        that.props.navigator.push({
          title: 'CheckInfo',
          component: CheckInfo,
          passProps: {
            colorArr: that.props.colorArr,
            color: that.props.color,
            auth: that.props.auth,
            home: that.props.home,
            destination: that.props.destination,
            transportation: that.state.transportation,
            duration: data.rows[0].elements[0].duration,
            arrivalTime: arrivalTime,
            leaveTime: leaveTime
          }
        });
      });
  }


  handleArrivalTime(date) {
     this.setState({
       arrivalTime: date
     });
     console.log(this.state.arrivalTime);
     console.log(this.state.timeZoneOffsetInHours);
  }

  render() {

    var PickerItemIOS = PickerIOS.Item;
    var transportation = ["Driving", "Walking", "Bicycling", "Transit"];

    return (
      <View style={[styles.mainContainer, {backgroundColor: this.props.colorArr[this.props.color].bg}]}>

        <Text style={styles.title}>How do you get there and by what time?</Text>

        <PickerIOS
          selectedValue={this.state.transportation}
          onValueChange={(transportation) => this.setState({transportation})}>
          {transportation.map((transportation) => (
            <PickerItemIOS
              key={transportation}
              value={transportation}
              label={transportation} />
          )
        )}
        </PickerIOS>

        <DatePickerIOS
          date={this.state.date}
          mode="time"
          minuteInterval={5}
          onDateChange={(date) => this.setState({date})}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.addTransportation.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> Submit </Text>
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
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  updateAlert: {
    textAlign: 'center'
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

module.exports = Transportation;