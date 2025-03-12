import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";

export default class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Home",
    tabBarIcon: ({ tintColor }) => <Icon name="home" type="entypo" size={26} color={tintColor} />
  });

  render() {
    return <View></View>
  }
}
