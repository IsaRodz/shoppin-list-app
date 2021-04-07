import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDHLHpUVR6850QajwNW4NjKJc9K4_QZQIg',
    authDomain: 'chat-app-792e9.firebaseapp.com',
    databaseURL: 'https://chat-app-792e9.firebaseio.com',
    projectId: 'chat-app-792e9',
    storageBucket: 'chat-app-792e9.appspot.com',
    messagingSenderId: '660040631410',
    appId: '1:660040631410:web:8ec973a2ab0d11a8ea6eeb',
  });
}

export default firebase;
