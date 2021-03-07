import { useState, useCallback } from 'react';
import { Appearance } from 'react-native-appearance';
import { createRexStore } from 'rex-state';

const colorScheme = Appearance.getColorScheme();

const currentMode =
  ['light', 'dark'].indexOf(colorScheme) > -1
    ? (colorScheme as colorSchemeTypes)
    : 'light';

type colorSchemeTypes = 'light' | 'dark';

type useDarkModeHookReturnType = {
  mode: colorSchemeTypes;
  toggleMode: () => void;
};

/**
 * A simple dark mode hook which returns the current mode of the app
 */
const useDarkModeHook = (
  defaultMode?: colorSchemeTypes
): useDarkModeHookReturnType => {
  const [mode, setMode] = useState<colorSchemeTypes>(
    defaultMode || currentMode
  );

  const toggleMode = useCallback(
    () =>
      setMode((selectedMode) => (selectedMode === 'light' ? 'dark' : 'light')),
    []
  );

  return { mode, toggleMode };
};

/**
 * Using rex-state to convert the hook into a shared state
 */
export const {
  useStore: useDarkMode,
  RexProvider: DarkModeProvider,
} = createRexStore(useDarkModeHook);
