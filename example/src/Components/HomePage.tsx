import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import color from '../color/color';
import { useDarkMode } from '../hooks/useDarkMode';
import { StatusBar } from 'expo-status-bar';

const HomePage = () => {
  const [mode] = useDarkMode();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color[mode].backgroundColor },
      ]}
    >
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Text style={[styles.text, { color: color[mode].textColor }]}>
        Theme Mode: <Text style={styles.mode}>{mode}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  mode: {
    fontWeight: 'bold',
  },
});

export default HomePage;
