<div align="center">

<img
  src="https://github.com/react-native-toolkit/rex-state/raw/master/assets/logo.png"
  alt="rex-state-logo"
  height="100px"
  width="100px"
/>

# Rex State

Convert hooks into shared states between React components

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

## Requirements

Rex State is built purely on React Hooks hence it requires React > 16.8 to work.

## Installation

```sh
yarn add rex-state

# or

npm i rex-state
```

## Usage

Consider the following hook which lets you toggle theme between light & dark modes

```jsx
const useThemeMode = (initialTheme = 'light') => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return [theme, toggleTheme];
};
```

You can use the `createRexStore` module from rex state to create a provider & a store hook to access the result of your `useThemeMode`

```jsx
import { createRexStore } from 'rex-state';

const { useStore: useTheme, RexProvider: ThemeProvider } = createRexStore(
  useThemeMode
);
```

The `useStore` hook & `RexProvider` are renamed to `useTheme` & `ThemeProvider` for use in the application.

Now you can wrap your entire Application inside the `ThemeProvider` to ensure the context is setup properly for the `useTheme` hook.

```jsx
const App = () => {
  return (
    <ThemeProvider value="dark">
      {/* Rest of your application */}
      <ToggleButton />
      <ThemeText />
    </ThemeProvider>
  );
};
```

> Note: The value of the argument of `useThemeMode` function - `initialTheme` is supplied to the `ThemeProvider` using the `value` prop. The `value` prop only supports a single argument. Hence if your hook requires multiple arguments, you can pass them as a single object

Once you add the `ThemeProvider` to the top of your application's tree, the child components can now use the `useTheme` hook to access the result of your `useThemeMode` hook. This time, when you call `toggleTheme` in any of the child components, it will cause your entire application tree to re-render & all the components that use the `useTheme` hook will have the updated value!

The following is a toggle button that toggles the theme when users click on it.

```jsx
const ToggleButton = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <View>
      <Text>Is Dark Mode?</Text>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
    </View>
  );
};
```

The next component is a text block that simply displays the theme's mode

```jsx
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

Invoking the `toggleTheme` function from the `<ToggleButton/>` component updates the `<ThemeText/>` component. This means your hook is now a shared state between the two components!

Also, check out the [counter example](https://codesandbox.io/s/rex-counter-2m4zy?file=/src/App.js) from codesandbox

Rex State is good for some use cases and not suitable for some use cases since it uses the [React Context](https://reactjs.org/docs/context.html#api) API which is considered inefficient as a change causes the entire React child tree to re-render. Read the [performance](https://rex-state.netlify.app/?path=/story/intro-performance--page) section to see how to use Rex State effectively.

## Why Rex State?

Rex State is a handy utility to make your hooks more powerful. It is simple, un-opinionated & is very tiny!

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
