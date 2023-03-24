import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Animated, Easing} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from 'react-native-vector-icons/AntDesign';

const Animate = () => {
    const spinValue = new Animated.Value(0);

    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    useEffect(() => {
      spin();
    }, []);

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });

      return (
        <SafeAreaView>
          <View style={styles.container}>
            <Animated.View style={{transform: [{rotate}]}}>
          <AntDesign name={'loading1'} color={"#540d6e"} size={50} />
            </Animated.View>
          </View>
        </SafeAreaView>
      );

}

export default Animate

const styles = StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });