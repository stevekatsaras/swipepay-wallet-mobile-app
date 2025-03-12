import React, { Component } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Config from "react-native-config";
import Auth from "../../common/Auth";

export default class Billers extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: <Icon
      name="add"
      type="material"
      size={26}
      color="#ffffff"
      containerStyle={{padding: 10}}
      onPress={() => navigation.navigate("AddBiller")} />,
    title: "Billers",
    tabBarIcon: ({tintColor}) => <Icon name="assignment" type="material" size={26} color={tintColor} />,
    tabBarOnPress: (tapEvent) => {
      navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "SignedInNavigator",
            action: NavigationActions.navigate({
              routeName: "Tabs",
              action: NavigationActions.navigate({
                routeName: "Billers"
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
      dataBillers: []
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
        this.fetchBillers();
      })
      .catch(err => alert("An error occurred"));
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true
    }, () => {
      this.fetchBillers();
    });
  }

  fetchBillers = () => {
    fetch(Config.BASE_URL + "/user/biller/list", {
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
        dataBillers: responseJson,
      });
    });
  };

  listItemClick = (item) => {
    this.props.navigation.navigate("Biller", {
      id: item.id
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
    else if (this.state.dataBillers.length == 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.noBillersCaption}>No billers yet</Text>
          <Text>Why not add one?</Text>
        </View>
      );
    }
    else {
      return (
        <View style={{backgroundColor: "#ffffff", flex: 1}}>
          <List containerStyle={{flex: 1}}>
            <FlatList
              data={this.state.dataBillers}
              renderItem={({item}) => (
                <ListItem
                  key={item.id}
                  title={`${item.billerCode} - ${item.billerName}`}
                  subtitle={`${item.reference}`}
                  leftIcon={{name: "assignment"}}
                  rightTitle={`$${item.amount}`}
                  rightTitleContainerStyle={{flex: 0.3}}
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
  emptyView: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center"
  },
  noBillersCaption: {
    fontWeight: "bold"
  }
});
