import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, List, ListItem } from "react-native-elements";

export default class More extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "More",
    tabBarIcon: ({ tintColor }) => <Icon name="more-horiz" type="material" size={26} color={tintColor} />
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <List>
          <ListItem
            title="Profile"
            leftIcon={{name: "person"}}
            onPress={() => this.props.navigation.navigate("Profile")} />
          <ListItem
            title="Settings"
            leftIcon={{name: "settings"}} />
          <ListItem
            title="About"
            leftIcon={{name: "error-outline"}} />
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#ffffff",
    flex: 1
  }
});
