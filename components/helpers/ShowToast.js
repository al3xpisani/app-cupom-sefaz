
import Toast from "react-native-root-toast";

export const ShowToast = (title) => {
    Toast.show(String(title), {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "#540d6e",
        textColor: "#ffffff",
      });
}