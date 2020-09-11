<div align="center">

# 🦖 Rex State

React States on Steroids 💉💊

Instantly convert your hook into a shared state between react components!

[![Build Status][build-badge]][build]
[![Maintainability][maintainability-badge]][maintainability-url]
[![Test Coverage][coverage-badge]][coverage-url]

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]
[![Bundlephobia][bundle-phobia-badge]][bundle-phobia]

[![Star on GitHub][github-star-badge]][github-star]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Twitter Follow][twitter-badge]][twitter]

---

### PRs Welcome 👍✨

</div>

- 📦 [Installation](#installation)
- ℹ️ [Usage](#usage)
- 📑 [Documentation][storybook-url]
- 👨🏽‍🏫 Examples
  - [Simple Counter][codesandbox-example] with React.js on CodeSandbox
  - [Dark Mode] with React Native on expo. Project in `example/` directory
- ✨ [Why Rex State?](#why-rex-state)

## Motivation

Rex State was initially built as a state management library. But after using it in many projects, its main purpose became creating hooks where the data returned by the hook can be shared across multiple react components.

## Requirements

Rex State is built purely on React Hooks hence it requires React > 16.8 to work.

## Installation

```sh
yarn add rex-state

# or

npm i rex-state
```

## Usage

```jsx
import { createRexStore } from 'rex-state';

// A simple hook to toggle theme modes between 'light' & 'dark'
const useThemeHook = (initialTheme = 'light') => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return [theme, toggleTheme];
};

// using `createRexStore` to create a Provider & a Hook with shared state
const { useStore: useTheme, RexProvider: ThemeProvider } = createRexStore(
  useThemeHook
);

// Use the `ThemeProvider` at the top level of your React component tree
const App = () => {
  // `initialTheme` value can be supplied using the value prop of `ThemeProvider`
  return (
    <ThemeProvider value="dark">
      {/* Rest of your application */}
      <ToggleButton />
    </ThemeProvider>
  );
};

// All components can now access the `useTheme` hook
const ToggleButton = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <View>
      <Text>Is Dark Mode?</Text>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
    </View>
  );
};

// Calling `toggleTheme` in above component will cause updates
// in all the components in the Application tree using the context API
const ThemeText = () => {
  const [theme] = useTheme();

  return (
    <>
      <Text>Theme Mode: </Text>
      <Text>{theme}</Text>
    </>
  );
};
```

## Why Rex State?

- It's Tiny!
- Simple & un-opinionated
- Makes hooks much more powerful

## Licenses

MIT © [DaniAkash][twitter]

[codesandbox-example]: https://codesandbox.io/s/rex-counter-2m4zy?file=/src/App.js
[storybook-url]: https://rex-state.netlify.app
[build]: https://github.com/DaniAkash/rex-state/actions
[build-badge]: https://github.com/daniakash/rex-state/workflows/build/badge.svg
[coverage-badge]: https://api.codeclimate.com/v1/badges/f7954c1e1686cabeeb97/test_coverage
[coverage-url]: https://codeclimate.com/github/DaniAkash/rex-state/test_coverage
[maintainability-badge]: https://api.codeclimate.com/v1/badges/f7954c1e1686cabeeb97/maintainability
[maintainability-url]: https://codeclimate.com/github/DaniAkash/rex-state/maintainability
[bundle-phobia-badge]: https://badgen.net/bundlephobia/minzip/rex-state
[bundle-phobia]: https://bundlephobia.com/result?p=rex-state
[downloads-badge]: https://img.shields.io/npm/dm/rex-state.svg
[npmtrends]: http://www.npmtrends.com/rex-state
[package]: https://www.npmjs.com/package/rex-state
[version-badge]: https://img.shields.io/npm/v/rex-state.svg
[twitter]: https://twitter.com/dani_akash_
[twitter-badge]: https://img.shields.io/twitter/follow/dani_akash_?style=social
[github-watch-badge]: https://img.shields.io/github/watchers/DaniAkash/rex.svg?style=social
[github-watch]: https://github.com/DaniAkash/rex/watchers
[github-star-badge]: https://img.shields.io/github/stars/DaniAkash/rex.svg?style=social
[github-star]: https://github.com/DaniAkash/rex/stargazers
