import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Config from "react-native-config";
import Auth from "../../../common/Auth";

export default class ConfirmBiller extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Confirm biller"
  });

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      billerCode: this.props.navigation.state.params.billerCode,
      billerName: this.props.navigation.state.params.billerName,
      reference: this.props.navigation.state.params.reference,
      amount: this.props.navigation.state.params.amount
    }
  }

  componentDidMount() {
    Auth.getEmailAddress()
      .then(res => {
        this.setState({
          emailAddress: res
        });
      })
      .catch(err => alert("An error occurred"));
  };

  confirmClick = () => {
    fetch(Config.BASE_URL + "/user/biller/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailAddress: this.state.emailAddress,
        billerCode: this.state.billerCode,
        billerName: this.state.billerName,
        reference: this.state.reference,
        amount: this.state.amount
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "SignedInNavigator",
            action:  NavigationActions.navigate({
              routeName: "Tabs",
              action: NavigationActions.navigate({
                routeName: "Billers"
              })
            }),
          }),
        ],
        key: null
      }));
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
        <ScrollView containerStyle={styles.scrollView}>
          <List>
            <ListItem
              title="Biller Code"
              rightTitle={this.state.billerCode}
              rightTitleContainerStyle={{flex: 2, alignItems: "flex-start"}}
              hideChevron={true} />
            <ListItem
              title="Biller Name"
              rightTitle={this.state.billerName}
              rightTitleContainerStyle={{flex: 2, alignItems: "flex-start"}}
              hideChevron={true} />
            <ListItem
              title="Reference"
              rightTitle={this.state.reference}
              rightTitleContainerStyle={{flex: 2, alignItems: "flex-start"}}
              hideChevron={true} />
            <ListItem
              title="Amount"
              rightTitle={this.state.amount}
              rightTitleContainerStyle={{flex: 2, alignItems: "flex-start"}}
              hideChevron={true} />
          </List>
          <Button
            backgroundColor="#00aeef"
            buttonStyle={{marginTop: 20}}
            title="Confirm"
            onPress={this.confirmClick} />
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
