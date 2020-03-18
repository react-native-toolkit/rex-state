<div align="center">

# 🦖 Rex State

React States on Steroids 💉💊

The simplest state management tool for React. Built completely with React Hooks!

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
- 👨🏽‍🏫 [Tutorial](#tutorial)
- 💡 [Examples](#examples)
- 🏎 [Performance](#performance)
- ✨ [Why Rex State?](#why-rex-state)

## Motivation

React is a simple and straightforward library for building UI however, the current solutions require you to learn additional concepts and add more dependencies to your project.

Rex State aims to leverage the simplicity of React Hooks, letting you manage state without having to use any new concepts or huge dependencies and it also encourages good programming principles!

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
import useRex, { createRexStore } from "rex-state";
```

### API ﹣

- [`useRex`](#userex-hook)
- [`createRexStore`](#createrexstore)

Rex State is inspired by React's simplicity in building UI. Hence it borrows one of the most common React-ish style for creating & updating states.

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

> Try this example directly in [CodeSandbox][simple-counter]

> Since `useRex` hook is built only to simplify managing large state objects. You can follow this pattern without rex-state too!

## `createRexStore`

`createRexStore` accepts your hook as the argument and returns an object with three properties ﹣

- `RexProvider` which is a "[`Provider`](https://reactjs.org/docs/context.html#contextprovider)" component that will let you pass your hook down the React component tree to all the components by storing it in React context.
- `injectStore` is an [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) (HOC) which will pass the required props from the hook in the React Context to your component.
- `useStore` hook will fetch your hook from the React context into your current component. This is built on top of the react "[`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext)" hook and comes with it's own [performance concerns](https://github.com/facebook/react/issues/15156). Read the [performance](#performance) section for more info.

## Tutorial

### Centralized state management with Rex State

Rex State simplifies building re-usable hooks. However, it also provides an easy to use API to build a centralized state that can be easily shared across your entire application.

> tl;dr ﹣ The code in the below example available for you to try in [CodeSandbox][central-state-management]

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
    get tasksCount() {
      return state.tasks.length;
    },
    get completedTasksCount() {
      return state.tasks.filter(task => task.isComplete).length;
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

> Read about [`useRex`](#userex-hook) in detail

Next step is to make this hook available to all components. Rex State comes with `createRexStore` module for this purpose which will create a store with your hook.

```jsx
const { RexProvider, injectStore } = createRexStore(useToDoList);
```

> Read about [`createRexStore`](#createrexstore) in detail

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

We need the task title inside our title components. A regular title component will look something like this ﹣

```jsx
const Title = ({ title }) => {
  return <h1>{title}</h1>;
};
```

Now the `title` prop of our component is basically the getter property `title` returned from the `useToDoList` hook. Here we can use the `injectStore` HOC to inject the `title` prop directly to the HOC as follows ﹣

```jsx
const Title = injectStore("title")(({ title }) => {
  return <h1>{title}</h1>;
});
```

#### InputField

In this component we need to use the `addTask` method returned by our hook to add a new task.

```jsx
const InputField = injectStore("addTask")(({ addTask }) => {
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
});
```

> Since we are using the values returned by hooks, all the components are already subscribed to the state changes and the new task will be reflected in UI without any complex stuff 👍

#### TasksList

We now have to use the `tasks` property to display the list of tasks. For toggle option we just have to call `toggleTask` method with the task index. To pass multiple props from our `useToDoList` hook, we have to use an array in the `injectStore` HOC as follows.

```jsx
const TasksList = injectStore(["tasks", "toggleTask"])(
  ({ tasks, toggleTask }) => {
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
  }
);
```

#### TasksStats

You probably already know how to build this one 😎

```jsx
const TasksStats = injectStore(["tasksCount", "completedTasksCount"])(
  ({ tasksCount, completedTasksCount }) => {
    return (
      <div>{`Total: ${tasksCount}, Completed: ${completedTasksCount}`}</div>
    );
  }
);
```

That concludes this tutorial. The final working code is available for you to try out in **[CodeSandbox][central-state-management]**

> You can also create multiple stores. Just rename `RexProvider` & `injectStore` properties of each store before you export them to other components 😁

## Examples

- [Simple Counter][simple-counter]
- [Rex State for Centralized State Management][central-state-management]
- [Usage with Typescript][ts-example]
- [How to `useStore`][usestore-example]

## Performance

Rex State's `injectStore` HOC returns a memoized component (using [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo)) which ensures the component is re-rendered only when the property that the component is dependent on is updated.

Consider you have a hook such as ﹣

```jsx
const useInfo = () => {
  const [state, setState] = useRex({
    title: "My Title",
    description: "Some Description"
  });

  return {
    get title() {
      return state.title;
    },
    get description() {
      return state.description;
    },
    updateDescription(newDescription) {
      setState({ description: newDescription });
    }
  };
};
```

A component that is dependent on the `title` alone will should not be affected by the updates to the `description` state using `updateDescription` method. `injectStore` ensures such re-renders are prevented.

However, this optimization is only applicable to primitive data types since non-primitive data types will not pass the [javascript equality comparisons](https://alligator.io/react/usememo/#referential-equality).

This means the following code is efficent 👍﹣

```jsx
return {
  get title() {
    return state.title;
  },
  get description() {
    return state.description;
  }
};
```

The following code is inefficient 🙅 ﹣

```jsx
return {
  get data() {
    return {
      title: state.title,
      description: state.description
    };
  }
};
```

This optimization is implemented based on the second option of [Dan Abramov's suggestion](https://github.com/facebook/react/issues/15156#issuecomment-474590693).

> `useStore` is basically a direct implementation of `useContext` without any such optimization. You can refer [this example][usestore-example] on how to use `useStore` and you can apply a different optimization ⚡️ if you want! ✨

## Why Rex State?

- It's Tiny!
- Simple & un-opinionated
- As fast as React
- Built for projects of all sizes!

## TODO:

Everything is awesome! yay 🎉

- [x] Unit Tests
- [x] Performance Testing
- [x] CI/CD Setup

## Licenses

MIT © [DaniAkash][twitter]

[ts-example]: https://github.com/DaniAkash/rex-state-ts
[simple-counter]: https://codesandbox.io/s/rex-state-counter-8cubi
[central-state-management]: https://codesandbox.io/s/state-management-with-rex-state-4ivcd
[usestore-example]: https://codesandbox.io/s/centralized-state-management-with-rex-state-tkfvq
[build]: https://github.com/DaniAkash/rex-state/actions
[build-badge]: https://github.com/daniakash/rex-state/workflows/build/badge.svg
[coverage-badge]: https://api.codeclimate.com/v1/badges/f7954c1e1686cabeeb97/test_coverage
[coverage-url]: https://codeclimate.com/github/DaniAkash/rex-state/test_coverage
[maintainability-badge]: https://api.codeclimate.com/v1/badges/f7954c1e1686cabeeb97/maintainability
[maintainability-url]: https://codeclimate.com/github/DaniAkash/rex-state/maintainability
[bundle-phobia-badge]: https://badgen.net/bundlephobia/minzip/rex-state
[bundle-phobia]: https://bundlephobia.com/result?p=rex-state
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
