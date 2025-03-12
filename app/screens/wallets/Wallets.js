import React, { Component } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import CryptoIcon from "react-native-crypto-icons";
import Config from "react-native-config";
import Auth from "../../common/Auth";

export default class Wallets extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Wallets",
    tabBarIcon: ({ tintColor }) => <Icon name="layers" type="entypo" size={26} color={tintColor} />,
    tabBarOnPress: (tapEvent) => {
      navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "SignedInNavigator",
            action: NavigationActions.navigate({
              routeName: "Tabs",
              action: NavigationActions.navigate({
                routeName: "Wallets"
              })
            })
          })
        ],
        key: null
      }));
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      emailAddress: "",
      dataWallets: []
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    Auth.getEmailAddress()
      .then(res => {
        this.setState({
          emailAddress: res
        });
        this.fetchWallets();
      })
      .catch(err => alert("An error occurred"));
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true
    }, () => {
      this.fetchWallets();
    });
  }

  fetchWallets = () => {
    fetch(Config.BASE_URL + "/user/wallet/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailAddress: this.state.emailAddress
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        isRefreshing: false,
        dataWallets: responseJson,
      });
    });
  };

  listItemClick = (item) => {
    this.props.navigation.navigate("Wallet", {
      code: item.code
    });
  };

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
        <View style={styles.view}>
          <List containerStyle={{flex: 1}}>
            <FlatList
              data={this.state.dataWallets}
              renderItem={({item}) => (
                <ListItem
                  key={item.code}
                  leftIcon={
                    <CryptoIcon name={item.coinType.toLowerCase()} style={{fontSize: 20, color: "grey"}} />
                  }
                  title={`${item.walletBalance} ${item.coinType}`}
                  titleContainerStyle={{paddingLeft:10}}
                  subtitle={`${item.fiatBalance} ${item.fiatType}`}
                  subtitleContainerStyle={{paddingLeft:10}}
                  rightTitle={`${item.coinName}`}
                  rightTitleContainerStyle={{flex:0.4}}
                  onPress={() => this.listItemClick(item)} />
              )}
              keyExtractor={(item, index) => index.toString()}
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh} />
          </List>

        </View>
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
  view: {
    backgroundColor: "#ffffff",
    flex: 1
  }
});
