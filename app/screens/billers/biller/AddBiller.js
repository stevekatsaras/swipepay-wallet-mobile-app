import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, FormInput, FormLabel } from "react-native-elements";
import Config from "react-native-config";
import Auth from "../../../common/Auth";

export default class AddBiller extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: <Icon
      name="camera"
      type="entypo"
      size={26}
      color="#ffffff"
      containerStyle={{padding: 10}} />,
    title: "Add biller"
  });

  constructor(props) {
    super(props);
    this.state = {
      billerCode: "",
      reference: "",
      amount: ""
    }
  }

  nextClick = () => {
    fetch(Config.BASE_URL + "/user/biller/lookup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        billerCode: this.state.billerCode,
        reference: this.state.reference
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.navigation.navigate("ConfirmBiller", {
        billerCode: this.state.billerCode,
        billerName: responseJson.billerName,
        reference: this.state.reference,
        amount: this.state.amount
      });
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
        <ScrollView containerStyle={styles.scrollView}>
          <FormLabel>Biller code</FormLabel>
          <FormInput
            keyboardType="numeric"
            placeholder="Biller code"
            onChangeText={(text) => this.setState({billerCode: text})} />
          <FormLabel>Reference</FormLabel>
          <FormInput
            keyboardType="numeric"
            placeholder="Reference"
            onChangeText={(text) => this.setState({reference: text})} />
          <FormLabel>Amount</FormLabel>
          <FormInput
            keyboardType="numeric"
            placeholder="Amount"
            onChangeText={(text) => this.setState({amount: text})} />
          <Button
            backgroundColor="#00aeef"
            buttonStyle={{marginTop: 20}}
            title="Next"
            onPress={this.nextClick} />
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
  }
});
