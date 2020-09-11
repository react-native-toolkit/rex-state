import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useDarkMode } from '../hooks/useDarkMode';

const styles = StyleSheet.create({
  textStyle: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    marginRight: 16,
  },
});

export const ThemeText = () => {
  const [mode] = useDarkMode();

  return (
    <>
      <Text>Theme Mode: </Text>
      <Text style={styles.textStyle}>{mode}</Text>
    </>
  );
};

export const ToggleButton = () => {
  const [mode, toggleMode] = useDarkMode();

  return (
    <View style={styles.toggleContainer}>
      <Text style={[styles.label]}>Is Dark Mode?</Text>
      <Switch value={mode === 'dark'} onValueChange={toggleMode} />
    </View>
  );
};
