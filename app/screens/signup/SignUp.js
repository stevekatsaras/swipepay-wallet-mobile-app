import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, FormInput, FormLabel } from "react-native-elements";
import Config from "react-native-config";
import Auth from "../../common/Auth";

export default class SignIn extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Sign up"
  });

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: ""
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
        <ScrollView containerStyle={styles.scrollView}>
          <View style={styles.iconView}>
            <Icon name="user-circle-o" type="font-awesome" size={100} color="#00aeef" />
            <Text style={styles.caption}>Sign up to create new account</Text>
          </View>
          <FormLabel>First name</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="First name..."
            returnKeyType="next"
            onChangeText={(text) => this.setState({firstName: text})}
            onSubmitEditing={() => this.lastNameInput.focus()} />
          <FormLabel>Last name</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Last name..."
            returnKeyType="next"
            ref={(input) => this.lastNameInput = input}
            onChangeText={(text) => this.setState({lastName: text})}
            onSubmitEditing={() => this.emailInput.focus()} />
          <FormLabel>Email</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email address..."
            returnKeyType="next"
            ref={(input) => this.emailInput = input}
            onChangeText={(text) => this.setState({emailAddress: text})}
            onSubmitEditing={() => this.passwordInput.focus()} />
          <FormLabel>Password</FormLabel>
          <FormInput
            placeholder="Password..."
            returnKeyType="next"
            ref={(input) => this.passwordInput = input}
            secureTextEntry
            onChangeText={(text) => this.setState({password: text})}
            onSubmitEditing={() => this.confirmPasswordInput.focus()} />
          <FormLabel>Confirm password</FormLabel>
          <FormInput
            placeholder="Confirm password..."
            returnKeyType="go"
            ref={(input) => this.confirmPasswordInput = input}
            onChangeText={(text) => this.setState({confirmPassword: text})}
            secureTextEntry />
          <Button
            backgroundColor="#00aeef"
            buttonStyle={{marginTop: 20}}
            title="Sign up"
            onPress={this.signUpClick} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  signUpClick = () => {
    fetch(Config.BASE_URL + "/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.signedUp == "false") {
        Alert.alert("Sign up error", "Cannot sign up credentials")
      }
      else {
        Auth.onSignIn(this.state.emailAddress);
        this.props.navigation.navigate("SignedInNavigator");
      }
    });
  };
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
    marginTop: 20,
    alignItems: "center"
  },
  caption: {
    marginTop: 10
  }
});
