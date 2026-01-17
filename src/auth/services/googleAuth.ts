import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const userInfo = await GoogleSignin.signIn();
console.log(userInfo);

  const googleCredential = auth.GoogleAuthProvider.credential(
    userInfo.data?.idToken || '',
  );

  return auth().signInWithCredential(googleCredential);
};
