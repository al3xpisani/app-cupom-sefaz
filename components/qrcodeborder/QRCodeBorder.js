import {
    View,
  } from "react-native";

export const QRCodeBorder = ({color,
    size,
    borderLength,
    thickness = 2,
    borderRadius = 0,
    children
 }) => {
    return (
      <View style={{ height: size, width: size }}>
        {children}
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            top: 0,
            left: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderLeftWidth: thickness,
            borderTopLeftRadius: borderRadius,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            top: 0,
            right: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderRightWidth: thickness,
            borderTopRightRadius: borderRadius,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            bottom: 0,
            left: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderLeftWidth: thickness,
            borderBottomLeftRadius: borderRadius,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            bottom: 0,
            right: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderRightWidth: thickness,
            borderBottomRightRadius: borderRadius,
          }}
        ></View>
      </View>
    );
  }