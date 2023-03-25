import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    LayoutAnimation,
    UIManager,
  } from "react-native";

export default function useAnimateview() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(navigation.isFocused);
  const [updateAnimation, setUpdateAnimation] = useState(false)

  const focusValue = navigation.isFocused();

  if (isFocused !== focusValue) {
    setIsFocused(focusValue);
  }

  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () =>{
        console.log('>>>>>> on focus', navigation.isFocused())
        if (
          Platform.OS === 'android' &&
          UIManager.setLayoutAnimationEnabledExperimental
          ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
          }
          LayoutAnimation.configureNext({
            duration: 400,
            create: {type: 'linear', property: 'opacity'},
            update: {type: 'spring', springDamping: 0.4},
            delete: {type: 'linear', property: 'opacity'},
          });
          setIsFocused(true)
          setUpdateAnimation(true)
    });

    const unsubscribeBlur = navigation.addListener('blur', () =>{
        console.log('on blur <<<<<<<<<', navigation.isFocused())
      setIsFocused(false)
      setUpdateAnimation(false)
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
      clearTimeout()
    };
  });

  React.useDebugValue(updateAnimation);

  return updateAnimation
}
