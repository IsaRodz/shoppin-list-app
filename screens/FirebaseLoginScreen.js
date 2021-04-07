import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import theme from '../theme';

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

const auth = firebase.auth();

export default function FirebaseLoginScreen() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isLogged, setLogged] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

  const handlePress = async () => {
    try {
      setLoading(true);
      const user = await auth.createUserWithEmailAndPassword(email, password);
      console.log('signed in', { user });
    } catch (error) {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      setError(error.message);
      // ..
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  if (!isLogged)
    return (
      <View style={styles.container}>
        <Input
          keyboardType="email-address"
          label="Email"
          onChangeText={value => setEmail(value)}
        />
        <Input
          secureTextEntry
          label="Password"
          onChangeText={value => setPassword(value)}
        />
        <Button
          title="Create Account"
          onPress={handlePress}
          loading={isLoading}
        />
        {error && (
          <Text
            style={{
              margin: 10,
              color: '#f44336',
            }}
          >
            {error}
          </Text>
        )}
      </View>
    );

  return (
    <View style={{ padding: 10 }}>
      <Text>Email: {user.email}</Text>
      <Text>Name: {user.displayName}</Text>
      <Button
        title="Change name"
        onPress={() =>
          user.updateProfile({
            displayName: 'Isaac',
          })
        }
      />
      <Button
        type="clear"
        loading={isLoading}
        title="Sign out"
        onPress={() => {
          setLoading(true);
          auth.signOut();
          setLoading(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
