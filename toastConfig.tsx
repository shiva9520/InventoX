import { BaseToast } from 'react-native-toast-message';
import { View, StyleSheet } from 'react-native';

const toastConfig = {
  topRight: (props: any) => (
    <View style={styles.topRightContainer}>
      <BaseToast
        {...props}
        style={styles.toast}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 14, fontWeight: '600' }}
        text2Style={{ fontSize: 12 }}
      />
    </View>
  ),
};

export default toastConfig;

const styles = StyleSheet.create({
  topRightContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 9999,
  },
  toast: {
    borderLeftColor: '#4CAF50',
    width: 250,
  },
});
