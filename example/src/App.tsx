import * as React from 'react';
import HomePage from './Components/HomePage';
import ToggleButton from './Components/ToggleButton';
import { DarkModeProvider } from './hooks/useDarkMode';

export default function App() {
  return (
    <DarkModeProvider>
      <HomePage />
      <ToggleButton />
    </DarkModeProvider>
  );
}
