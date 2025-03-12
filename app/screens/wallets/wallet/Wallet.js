import React, { Component } from "react";
import { ActivityIndicator, KeyboardAvoidingView, SectionList, ScrollView, StyleSheet, View } from "react-native";
import { Button, Header, Icon, FormInput, FormLabel, ListItem, Text } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Config from "react-native-config";
import Auth from "../../../common/Auth";

export default class Wallet extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Wallet"
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      code: this.props.navigation.state.params.code,
      coinType: "",
      coinName: "",
      walletBalance: "",
      fiatBalance: "",
      fiatType: ""
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.fetchWallet();
  }

  fetchWallet = () => {
    fetch(Config.BASE_URL + "/user/wallet/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: this.state.code
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        coinType: responseJson.coinType,
        coinName: responseJson.coinName,
        walletBalance: responseJson.walletBalance,
        fiatBalance: responseJson.fiatBalance,
        fiatType: responseJson.fiatType
      });
    });
  };

  // payClick = () => {
  //
  // };

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
            <Text h3 style={styles.title}>{this.state.walletBalance} {this.state.coinType}</Text>
            <Text style={styles.subtitle}>{this.state.fiatBalance} {this.state.fiatType}</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <SectionList
              sections={[
                { title: "deposit address", data: ["Apple", "Apricot"] },
                { title: 'Fruits Name From B', data: ["Banana", "Blackberry"] },
                { title: 'Fruits Name From C', data: ["Cherry", "Coconut"] },
              ]}
              renderSectionHeader={({section: {title}}) => <Text h5 style={{backgroundColor: "#d3d3d3", padding:7}}>{title}</Text> }
              renderItem={({item}) => <ListItem title={item} /> }
              keyExtractor={(item, index) => index} />
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
    backgroundColor: "#ffffff",
    flex: 1
  }
  // scrollView: {
  //   flex: 1,
  //   justifyContent: "center"
  // },
  // iconView: {
  //   marginTop: 20,
  //   alignItems: "center"
  // },
});


//         <FormLabel>Reference</FormLabel>
//         <FormInput
//           keyboardType="numeric"
//           placeholder="Reference"
//           value={this.state.reference}
//           onChangeText={(text) => this.setState({reference: text})} />
//         <FormLabel>Amount</FormLabel>
//         <FormInput
//           keyboardType="numeric"
//           placeholder="Amount"
//           value={this.state.amount}
//           onChangeText={(text) => this.setState({amount: text})} />
//         <View>
//           <FormLabel>Update details</FormLabel>
//           <Switch
//             value={this.state.saveBiller}
//             onValueChange={(value) => this.setState({saveBiller: value})}
//             style={{marginLeft:17, marginTop: 7}} />
//         </View>
//         <Button
//           backgroundColor="#00aeef"
//           buttonStyle={{marginTop: 20}}
//           title="Pay"
//           onPress={this.payClick} />
