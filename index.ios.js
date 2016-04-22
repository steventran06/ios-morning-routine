var Login = require('./App/Components/Login');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
  Text,
  View
} from 'react-native';

class iOSMorningRoutine extends Component {
  render() {
    return (
    <NavigatorIOS
      style={styles.container}
      initialRoute={{
        component: Login,
        title: 'Log In'
      }}
    />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

AppRegistry.registerComponent('iOSMorningRoutine', () => iOSMorningRoutine);
