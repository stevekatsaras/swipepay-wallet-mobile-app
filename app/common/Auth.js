import { AsyncStorage } from "react-native";

export default class Auth {
  static AUTHENTICATED = "AUTHENTICATED";
  static EMAIL_ADDRESS = "EMAIL_ADDRESS";

  static onSignIn = emailAddress => {
    AsyncStorage.setItem(Auth.AUTHENTICATED, "true");
    AsyncStorage.setItem(Auth.EMAIL_ADDRESS, emailAddress);
  };

  static onSignOut = () => {
    AsyncStorage.removeItem(Auth.AUTHENTICATED);
    AsyncStorage.removeItem(Auth.EMAIL_ADDRESS);
  };

  static getEmailAddress = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(Auth.EMAIL_ADDRESS)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };

  static isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(Auth.AUTHENTICATED)
        .then(res => {
          if (res != null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}
