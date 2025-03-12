import React, { Component } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Input } from "react-native-elements";
import Config from "react-native-config";
import Auth from "../../common/Auth";

export default class SignIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Sign in"
  });

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      password: ""
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoView}>
            <Image
              source={require("../../images/swipepay_logo_transparent_260x80px.png")}
            />
            <Text style={styles.logoCaption}>Payments unchained</Text>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Email address..."
              returnKeyType="next"
              onChangeText={text => this.setState({ emailAddress: text })}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <Input
              placeholder="Password..."
              returnKeyType="go"
              ref={input => (this.passwordInput = input)}
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
            />
            <Button
              backgroundColor="#00aeef"
              buttonStyle={{ marginTop: 20 }}
              title="Sign in"
              onPress={this.signInClick}
            />
            <View style={styles.linksView}>
              <View style={styles.signUpView}>
                <Button
                  backgroundColor="transparent"
                  textStyle={{ color: "#00aeef" }}
                  title="Sign up"
                  onPress={() => this.props.navigation.navigate("SignUp")}
                />
              </View>
              <View style={styles.forgotPasswordView}>
                <Button
                  backgroundColor="transparent"
                  textStyle={{ color: "#00aeef" }}
                  title="Forgot password?"
                  onPress={() =>
                    this.props.navigation.navigate("ForgotPassword")
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  signInClick = () => {
    fetch(Config.BASE_URL + "/user/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailAddress: this.state.emailAddress,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.authenticated == "false") {
          Alert.alert("Sign-in error", "Invalid credentials");
        } else {
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
  logoView: {
    alignItems: "center"
  },
  logoCaption: {
    marginTop: 10
  },
  linksView: {
    flexDirection: "row"
  },
  signUpView: {
    alignItems: "flex-start",
    flex: 0.5
  },
  forgotPasswordView: {
    alignItems: "flex-end",
    flex: 0.5
  }
});
