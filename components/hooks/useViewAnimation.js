import {
  LayoutAnimation,
  UIManager,
} from "react-native";

  const useViewAnimation = () => {
    const mountAnimation = new Promise((resolve) => {
      setTimeout(()=>{
        if (
          Platform.OS === 'android' &&
          UIManager.setLayoutAnimationEnabledExperimental
          ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
          }
          LayoutAnimation.configureNext({
            duration: 300,
            create: {type: 'linear', property: 'opacity'},
            update: {type: 'spring', springDamping: 0.4},
            delete: {type: 'linear', property: 'opacity'},
          });
          resolve('AnimationPromiseMounted')
        },100)
      })
      return mountAnimation
  }

  export default useViewAnimation