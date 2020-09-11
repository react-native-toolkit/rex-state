<div align="center">

<img
  src="https://github.com/react-native-toolkit/rex-state/raw/master/assets/logo.png"
  alt="rex-state-logo"
  height="100px"
  width="100px"
/>

# Rex State

Convert hooks into shared states between react components

[![Build Status][build-badge]][build]
[![Maintainability][maintainability-badge]][maintainability-url]
[![Test Coverage][coverage-badge]][coverage-url]

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]
[![Bundlephobia][bundle-phobia-badge]][bundle-phobia]

[![Star on GitHub][github-star-badge]][github-star]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Twitter Follow][twitter-badge]][twitter]

[![donate][coffee-badge]][coffee-url]
[![sponsor][sponsor-badge]][sponsor-url]
[![support][support-badge]][support-url]

[![Storybook][storybook-badge]][website] [![Chromatic][chromatic-badge]][chromatic]

---

### PRs Welcome 👍✨

</div>

- 📦 [Installation](#installation)
- ℹ️ [Usage](#usage)
- 📑 [Documentation][storybook-url]
- 👨🏽‍🏫 Examples
  - [Simple Counter][codesandbox-example] with React.js on CodeSandbox
  - [Dark Mode][expo-app] with React Native on expo. Project in [`example/`](https://github.com/react-native-toolkit/rex-state/tree/master/example) directory
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
[expo-app]: https://expo.io/@daniakash/rex-state-example
[coffee-badge]: https://img.shields.io/badge/-%E2%98%95%EF%B8%8F%20buy%20me%20a%20coffee-e85b46
[coffee-url]: https://www.buymeacoffee.com/daniakash
[sponsor-badge]: https://img.shields.io/badge/-%F0%9F%8F%85%20sponsor%20this%20project-e85b46
[sponsor-url]: https://www.buymeacoffee.com/daniakash/e/6983
[support-badge]: https://img.shields.io/badge/-Get%20Support-e85b46
[support-url]: https://www.buymeacoffee.com/daniakash/e/7030
[build]: https://github.com/react-native-toolkit/rex-state/actions
[build-badge]: https://github.com/react-native-toolkit/rex-state/workflows/build/badge.svg
[coverage-badge]: https://api.codeclimate.com/v1/badges/9bd775907eca8a3dbab3/test_coverage
[coverage-url]: https://codeclimate.com/github/react-native-toolkit/rex-state/test_coverage
[maintainability-badge]: https://api.codeclimate.com/v1/badges/9bd775907eca8a3dbab3/maintainability
[maintainability-url]: https://codeclimate.com/github/react-native-toolkit/rex-state/maintainability
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
[storybook-badge]: https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg
[website]: https://rex-state.netlify.app
[chromatic-badge]: https://img.shields.io/badge/-chromatic-%23fc521f
[chromatic]: https://chromatic.com/library?appId=5f5b21fe6f304800225bd9cf&branch=master
