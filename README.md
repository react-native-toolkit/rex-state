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

Rex State is built purely on React Hooks hence it requires React > 16.8 to work.

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
    updateValue(value) {
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

> Try this example directly in [CodeSandbox](https://codesandbox.io/s/rex-state-input-70whd)

## `useRex` Hook

`useRex` is very similar to the React's own `useState` hook. However, it is built to work with `objects` just like `state` & `setState` from traditional react class components.

You can initialize `useRex` hook with an object such as ﹣

```jsx
const [state, setState] = useRex({
  name: "",
  email: "",
  phone: ""
});
```

Now if you want to update only the name property, you can do ﹣

```
setState({ name: "John Doe" });
```

This works similar to how `this.setState` works in class components and updates the `name` property of your state. However, unlike the class components this operation is synchronous.

### Building a re-usable hook

The pattern that was used in the example code above lets you build re-usable hooks that can be easily shared across multiple components. Consider the following example where we will build a hook for a counter ﹣

```jsx
const useCounter = () => {
  const [state, setState] = useRex({ count: 0 });

  return {
    get count() {
      return state.count;
    },
    increment() {
      setState({ count: state.count + 1 });
    },
    decrement() {
      setState({ count: state.count - 1 });
    }
  };
};
```

The `useCounter` hook contains the state for tracking your counter. It returns an object with three properties (including a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) for accessing the count)

This hook can now be easily added into any functional react component as follows ﹣

```jsx
const Counter = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={increment}>up</button>
      <span>{count}</span>
      <button onClick={decrement}>down</button>
    </div>
  );
};
```

> Try this example directly in [CodeSandbox](https://codesandbox.io/s/rex-state-counter-8cubi)

> Since `useRex` hook is built only to simplify managing large state objects. You can follow this pattern without rex-state too!

## Centralized state management with Rex State

Rex State simplifies building re-usable hooks. However, it also provides an easy to use API to build a centralized state that can be easily shared across your entire application.

> tl;dr ﹣ The code in the below example available for you to try in [CodeSandbox](https://codesandbox.io/s/centralized-state-management-with-rex-state-tkfvq)

Follow the below example to create a centralized state with Rex State ﹣

### Building a ToDo app with Rex State

Let's start with building a simple todo app which contains a list of tasks and their completion status in the following format ﹣

```jsx
[
  {
    task: "Learning React",
    isComplete: false
  },
  {
    task: "Learning Rex State",
    isComplete: false
  }
];
```

We'll start with creating a re-usable hook for our tasks ﹣

```jsx
import useRex from "rex-state";

const useToDoList = () => {
  const [state, setState] = useRex({
    title: "Learning Frontend Development",
    tasks: [
      {
        task: "Learning React",
        isComplete: false
      },
      {
        task: "Learning Rex State",
        isComplete: false
      }
    ]
  });

  return {
    get title() {
      return state.title;
    },
    get tasks() {
      return state.tasks;
    },
    get completedTasks() {
      return state.tasks.filter(task => task.isComplete);
    },
    addTask(newTask) {
      const newTaskList = [
        ...state.tasks,
        {
          task: newTask,
          isComplete: false
        }
      ];
      setState({ tasks: newTaskList });
    },
    toggleTask(taskIndex) {
      const updatedTaskList = state.tasks.map((item, index) => {
        if (taskIndex === index) {
          return {
            task: item.task,
            isComplete: !item.isComplete
          };
        } else {
          return item;
        }
      });
      setState({ tasks: updatedTaskList });
    }
  };
};
```

Next step is to make this hook available to all components. Rex State comes with `createRexStore` module for this purpose which will create a store with your hook.

```jsx
const { RexProvider, useStore } = createRexStore(useToDoList);
```

## `createRexStore`

`createRexStore` accepts your hook as the argument and returns an object with two properties ﹣

- `RexProvider` which is a "[Provider](https://reactjs.org/docs/context.html#contextprovider)" component that will let you pass your hook down the React component tree to all the components by storing it in React context.
- `useStore` hook will simply fetch your hook from the React context into your current component.

### React part of the App

We will be building 4 components in the ToDo List App.

- `<Title/>` - Title of our list
- `<InputField />` - For adding new tasks
- `<TasksList />` - Listing the tasks with a toggle option
- `<TasksStats />` - For displaying the completed tasks count

Since all these components are dependent on the `useToDoList` hook we created earlier, we have to wrap all these components inside the `RexProvider` component

```jsx
export default function App() {
  return (
    <RexProvider>
      <Title />
      <InputField />
      <TasksList />
      <TasksStats />
    </RexProvider>
  );
}
```

#### Title

We need the task title inside our title components. This time we can simply call `useStore` hook which will return our `useToDoList` hook that contains the `title` property

```jsx
const Title = () => {
  const { title } = useStore();
  return <h1>{title}</h1>;
};
```

#### InputField

In this component we need to use the `addTask` method returned by our hook to add a new task. Since we have `useStore`, this is straightforward and you just have to call this method when users click the add button

```jsx
const InputField = () => {
  const { addTask } = useStore();
  const [text, updateText] = useState("");

  const submit = () => {
    addTask(text);
    updateText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add New Task..."
        value={text}
        onChange={e => updateText(e.target.value)}
      />
      <button onClick={submit}>Add</button>
    </div>
  );
};
```

> Since we are using the values returned by hooks, all the components are already subscribed to the state changes and the new task will be reflected in UI without any complex stuff 👍

#### TasksList

We now have to use the `tasks` property to display the list of tasks. For toggle option we just have to call `toggleTask` method with the task index

```jsx
const TasksList = () => {
  const { tasks, toggleTask } = useStore();
  return (
    <ul>
      {tasks.map((item, itemIndex) => {
        const toggle = () => toggleTask(itemIndex);
        return (
          <li key={itemIndex}>
            <input
              type="checkbox"
              onChange={toggle}
              checked={item.isComplete}
            />
            {item.task}
          </li>
        );
      })}
    </ul>
  );
};
```

#### TasksStats

You probably already know how to build this one 😎

```jsx
const TasksStats = () => {
  const { tasks, completedTasks } = useStore();

  return (
    <div>{`Total: ${tasks.length}, Completed: ${completedTasks.length}`}</div>
  );
};
```

That concludes this tutorial. The final working code is available for you to try out in **[CodeSandbox](https://codesandbox.io/s/centralized-state-management-with-rex-state-tkfvq)**

> You can also create multiple stores. Just rename `RexProvider` & `useStore` properties of each store before you export them to other components 😁

## TODO:

I'm working hard to make this library PROD ready. Stay tuned! ✨

- [ ] Unit Tests
- [ ] Performance Testing - in progress
- [ ] CI/CD Setup

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
