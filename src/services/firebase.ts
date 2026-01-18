import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const COLLECTION = 'items';
import { Item } from '../screens/home/types';

export const createUser = async (email: string, password: string, userName: string) => {
    const res = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('users').doc(res.user.uid).set({
        uid: res.user.uid,
        userName: userName,
        email: email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    return res; 
};

export const loginUser = async (email: string, password: string) => {
    const res = await auth().signInWithEmailAndPassword(email, password);   
    return res; 
};

export const logoutUser = async () => {
    await auth().signOut();  
};

export const addItem = async (item: Item) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  await firestore()
    .collection(COLLECTION)
    .doc(item.id.toString())
    .set({
      ...item,
      userId: uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
};


export const updateItem = async (item: Item) => {
  const uid = auth().currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  await firestore()
    .collection(COLLECTION)
    .doc(item.id.toString())
    .update({
      name: item.name,
      stock: item.stock,
    });
};


export const deleteItem = async (id: number) => {
  const uid = auth().currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  await firestore()
    .collection(COLLECTION)
    .doc(id.toString())
    .delete();
};


export const subscribeItems = (callback: (items: Item[]) => void) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    callback([]);
    return () => {};
  }

  return firestore()
    .collection(COLLECTION)
    .where('userId', '==', uid)
    // .orderBy('name')
    .onSnapshot(snapshot => {
      if (!snapshot) {
        callback([]);
        return;
      }

      const list: Item[] = snapshot.docs.map(doc => doc.data() as Item);
      console.log(list);
      
      callback(list);
    });
};

