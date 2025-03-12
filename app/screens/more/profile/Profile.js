import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, FormInput, FormLabel } from "react-native-elements";
import Auth from "../../../common/Auth";

export default class Profile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Profile"
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Button
          backgroundColor="#00aeef"
          title="Sign out"
          onPress={this.signOutClick} />

      </ScrollView>
    );
  }

  signOutClick = () => {
    Auth.onSignOut();
    this.props.navigation.navigate("SignedOutNavigator");
  };
}

const styles = StyleSheet.create({

});
