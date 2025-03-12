import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, FormInput, FormLabel } from "react-native-elements";

export default class ForgotPassword extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Forgot password?"
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.iconView}>
            <Icon name="ios-unlock" type="ionicon" size={100} color="#00aeef" />
            <Text style={styles.caption}>Enter email to reset password</Text>
          </View>
          <FormLabel>Email</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email address..."
            returnKeyType="go" />
          <Button
            backgroundColor="#00aeef"
            buttonStyle={{marginTop: 20}}
            title="Reset" />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  scrollView: {
    flex: 1,
    justifyContent: "center"
  },
  iconView: {
    alignItems: "center"
  },
  caption: {
    marginTop: 10
  }
});
