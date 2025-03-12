import React, { Component } from "react";
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, View } from "react-native";
import { Button, Header, Icon, FormInput, FormLabel, Text } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Config from "react-native-config";
import Auth from "../../../common/Auth";

export default class Biller extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Biller"
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      id: this.props.navigation.state.params.id,
      billerCode: "",
      billerName: "",
      reference: "",
      amount: "",
      saveBiller: false
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.fetchBiller();
  }

  fetchBiller = () => {
    fetch(Config.BASE_URL + "/user/biller/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.id
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        billerCode: responseJson.billerCode,
        billerName: responseJson.billerName,
        reference: responseJson.reference,
        amount: responseJson.amount
      });
      //this.props.navigation.setParams({title: this.state.billerCode + " - " + this.state.billerName})
    });
  };

  payClick = () => {

  };

  // editClick = () => {
  //   fetch(Config.BASE_URL + "/user/biller/edit", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       id: this.state.id,
  //       reference: this.state.reference,
  //       amount: this.state.amount
  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     this.props.navigation.dispatch(NavigationActions.reset({
  //       index: 0,
  //       actions: [
  //         NavigationActions.navigate({
  //           routeName: "SignedInNavigator",
  //           action:  NavigationActions.navigate({
  //             routeName: "Tabs",
  //             action: NavigationActions.navigate({
  //               routeName: "Billers"
  //             })
  //           }),
  //         }),
  //       ],
  //       key: null
  //     }));
  //   });
  // };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#00aeef" />
        </View>
      );
    }
    else {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
          <View style={styles.titleView}>
            <Text h3 style={styles.title}>{this.state.billerCode}</Text>
            <Text style={styles.subtitle}>{this.state.billerName}</Text>
          </View>
          <ScrollView containerStyle={styles.scrollView}>
            <FormLabel>Reference</FormLabel>
            <FormInput
              keyboardType="numeric"
              placeholder="Reference"
              value={this.state.reference}
              onChangeText={(text) => this.setState({reference: text})} />
            <FormLabel>Amount</FormLabel>
            <FormInput
              keyboardType="numeric"
              placeholder="Amount"
              value={this.state.amount}
              onChangeText={(text) => this.setState({amount: text})} />
            <View>
              <FormLabel>Update details</FormLabel>
              <Switch
                value={this.state.saveBiller}
                onValueChange={(value) => this.setState({saveBiller: value})}
                style={{marginLeft:17, marginTop: 7}} />
            </View>
            <Button
              backgroundColor="#00aeef"
              buttonStyle={{marginTop: 20}}
              title="Pay"
              onPress={this.payClick} />
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loadingView: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center"
  },
  keyboardAvoidingView: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  titleView: {
    backgroundColor: "#00aeef",
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    paddingBottom: 10
  },
  subtitle: {
    color: "#fff"
  },
  scrollView: {
    flex: 1,
    justifyContent: "center"
  }
});
