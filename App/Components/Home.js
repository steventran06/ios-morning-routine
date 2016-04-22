'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';


class Home extends React.Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render(){
    return (
      <View>
        <Text>HELLO!!!</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'white',
    margin: 50,
    fontSize: 45
  }
});


module.exports = Home;
