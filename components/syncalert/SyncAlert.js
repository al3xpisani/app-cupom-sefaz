import {
    Alert,
  } from "react-native";

  export const SyncAlert = async (title, message, buttonLabel) => new Promise((resolve) => {
    Alert.alert(
      String(title),
      String(message),
      [
        {
          text: buttonLabel,
          onPress: () => {
            resolve('YES');
          },
        },
      ],
      { cancelable: false },
    );
  });