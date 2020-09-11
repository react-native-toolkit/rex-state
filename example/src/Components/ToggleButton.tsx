import React from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import color from '../color/color';
import { useDarkMode } from '../hooks/useDarkMode';

const ToggleButton = () => {
  const [mode, toggleMode] = useDarkMode();

  return (
    <View style={styles.toggleContainer}>
      <Text style={[styles.label, { color: color[mode].textColor }]}>
        Is Dark Mode?
      </Text>
      <Switch value={mode === 'dark'} onValueChange={toggleMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    position: 'absolute',
    top: 96,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    marginRight: 16,
  },
});

export default ToggleButton;
