<h1 align="center">
🦖 Rex State - React States on Steroids 💊
</h1>

<div align="center">

The simplest state management tool for React. Built completely with React Hooks!

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]

<!-- [![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage] -->

[![Star on GitHub][github-star-badge]][github-star]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Twitter Follow][twitter-badge]][twitter]

---

### 🚧 Work in Progress 👷🏽‍♂️🏗

This library is currently under heavy testing. Hence it is **NOT** recommended for PROD _just yet_... You are welcome to Install & Try out the project in the mean time!

### PRs Welcome 👍✨

</div>

## Motivation

React is a simple and straightforward library for building UI however, the current solutions to manage states aren't quite simple or straightforward as React.

Rex State aims to be the simplest way to manage states in your React Project.

## Requirements

Rex State is built purely on React Hooks hence it requires React > 16.8 to work. It also doesn't work with class components.

## Installation

```sh
yarn add rex-state

# or

npm i rex-state
```

## Usage

Rex State is inspired by React's simplicity in building UI. Hence it borrows one of the most common React-ish style for creating & updating states.

### This is a classic React functional component with `useState` hook

```jsx
import React, { useState } from "react";

const InputField = () => {
  const [value, updateValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      placeholder="Add Text here..."
      onChange={event => updateValue(event.target.value)}
    />
  );
};
```

The above component will render a simple input field and will take care of updating the input state when a new value is entered in the input field. However, the state & UI are tightly coupled together and it is impossible to reuse the same state logic to a different component.

### This is the same component using Rex State

```jsx
import React from "react";
import useRex from "rex-state";

const useInput = () => {
  const [state, setState] = useRex({ value: "" });

  return {
    get value() {
      return state.value;
    },
    updateValue(value: string) {
      setState({ value });
    }
  };
};

const InputField = () => {
  const { value, updateValue } = useInput();

  return (
    <input
      type="text"
      value={value}
      placeholder="Add Text here..."
      onChange={event => updateValue(event.target.value)}
    />
  );
};

export default InputField;
```

The functionality of the component remains unchanged, however we now have two entities.

- `useInput` is a hook which is used to define your application state.
- `InputField` is a functional React Component that uses `useInput` hook to render it's UI.

This decouples the UI from the State and also provides a nice & familiar way to write an API to define & manage your states.

Refer the Example app. Documentation will be completed soon...

## Running the Example App

- Clone this Repo
- Run `yarn` to install dependencies
- Run `yarn build` to build the project (ignore the warnings for now 😅)
- Run `yarn link` - This should register the package in your machine
- Move into the example folder `cd rex-example` & run `yarn link rex-state` to link the package
- Finally run `yarn && yarn start` in the `rex-example/` directory to start the example project

## Licenses

MIT © [DaniAkash][twitter]

<!-- [build-badge]:
[build]:
[coverage-badge]:
[coverage]:  -->

[downloads-badge]: https://img.shields.io/npm/dm/rex-state.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/rex-state
[package]: https://www.npmjs.com/package/rex-state
[version-badge]: https://img.shields.io/npm/v/rex-state.svg?style=flat-square
[twitter]: https://twitter.com/dani_akash_
[twitter-badge]: https://img.shields.io/twitter/follow/dani_akash_?style=social
[github-watch-badge]: https://img.shields.io/github/watchers/DaniAkash/rex.svg?style=social
[github-watch]: https://github.com/DaniAkash/rex/watchers
[github-star-badge]: https://img.shields.io/github/stars/DaniAkash/rex.svg?style=social
[github-star]: https://github.com/DaniAkash/rex/stargazers
