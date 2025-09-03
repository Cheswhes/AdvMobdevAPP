import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function InteractiveMenu() {
  const onPressButton1 = () => {
    Alert.alert('Button 1 pressed', 'You tapped Button 1!');
  };

  const onPressButton2 = () => {
    Alert.alert('Button 2 pressed', 'You tapped Button 2!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Interactions Menu!</Text>

      <View style={styles.buttonContainer}>
        <Button title="Press Me 1" onPress={onPressButton1} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Press Me 2" onPress={onPressButton2} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});