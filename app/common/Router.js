import {
  StackNavigator,
  TabNavigator,
  createAppContainer
} from "react-navigation";

import { createStackNavigator } from "react-navigation";

import Home from "../screens/home/Home";
import Wallets from "../screens/wallets/Wallets";
import Wallet from "../screens/wallets/wallet/Wallet";
import Billers from "../screens/billers/Billers";
import AddBiller from "../screens/billers/biller/AddBiller";
import ConfirmBiller from "../screens/billers/biller/ConfirmBiller";
import Biller from "../screens/billers/biller/Biller";
import More from "../screens/more/More";
import Profile from "../screens/more/profile/Profile";
import SignIn from "../screens/signin/SignIn";
import SignIn1 from "../screens/signin/SignIn1";
import SignUp from "../screens/signup/SignUp";
import ForgotPassword from "../screens/forgotpassword/ForgotPassword";

export default class Router {
  static createSignedOutNavigator = () => {
    return createStackNavigator({
      SignIn: SignIn
    });
  };

  //   return StackNavigator(
  //     {
  //       SignIn: { screen: SignIn },
  //       SignUp: { screen: SignUp },
  //       ForgotPassword: { screen: ForgotPassword }
  //     },
  //     {
  //       navigationOptions: {
  //         headerBackTitle: null,
  //         headerStyle: { backgroundColor: "#00aeef", borderBottomWidth: 0 },
  //         headerTintColor: "#fff"
  //       }
  //     }
  //   );
  // return StackNavigator(
  //   {
  //     SignIn: { screen: SignIn },
  //     SignUp: { screen: SignUp },
  //     ForgotPassword: { screen: ForgotPassword }
  //   },
  //   {
  //     navigationOptions: {
  //       headerBackTitle: null,
  //       headerStyle: { backgroundColor: "#00aeef", borderBottomWidth: 0 },
  //       headerTintColor: "#fff"
  //     }
  //   }
  // );

  // static createSignedInTabs = () => {
  //   return TabNavigator(
  //     {
  //       Home: { screen: Home },
  //       Wallets: { screen: Wallets },
  //       Billers: { screen: Billers },
  //       More: { screen: More }
  //     },
  //     {
  //       animationEnabled: true,
  //       tabBarOptions: {
  //         activeTintColor: "#00aeef"
  //       }
  //     }
  //   );
  // };

  // static createSignedInNavigator = () => {
  //   return StackNavigator(
  //     {
  //       Tabs: { screen: Router.createSignedInTabs() },
  //       Wallet: { screen: Wallet },
  //       AddBiller: { screen: AddBiller },
  //       ConfirmBiller: { screen: ConfirmBiller },
  //       Biller: { screen: Biller },
  //       Profile: { screen: Profile }
  //     },
  //     {
  //       navigationOptions: {
  //         headerBackTitle: null,
  //         headerStyle: { backgroundColor: "#00aeef", borderBottomWidth: 0 },
  //         headerTintColor: "#fff"
  //       }
  //     }
  //   );
  // };

  static initialize = isSignedIn => {
    const RootNavigator = createStackNavigator({
      SignedOutNavigator: Router.createSignedOutNavigator()
    });
    return createAppContainer(RootNavigator);
  };

  static createRootNavigator = isSignedIn => {
    return createStackNavigator(
      {
        SignedOutNavigator: { screen: Router.createSignedOutNavigator() }
      },
      {
        headerMode: "none"
      }
    );

    //   return StackNavigator(
    //     {
    //       SignedOutNavigator: { screen: Router.createSignedOutNavigator() } //,
    //       //SignedInNavigator: { screen: Router.createSignedInNavigator() }
    //     },
    //     {
    //       headerMode: "none",
    //       initialRouteName: isSignedIn
    //         ? "SignedInNavigator"
    //         : "SignedOutNavigator"
    //     }
    //   );
  };
}
