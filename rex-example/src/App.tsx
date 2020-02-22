import React, { useState } from "react";
import store from "./store/store";

const { useRex } = store;

export default function App() {
  const store = useRex();
  const { todos } = store;

  const [newTask, updateNewTask] = useState("");

  const onAddTask = () => {
    todos.addTask(newTask);
    updateNewTask("");
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={event => updateNewTask(event.target.value)}
        placeholder="New Task"
      />
      <button onClick={onAddTask}>Submit</button>
      <ul>
        {todos.list.map((item, itemIndex) => {
          const onClickCheckbox = () => todos.toggleTask(itemIndex);
          return (
            <li key={itemIndex}>
              <input
                type="checkbox"
                onChange={onClickCheckbox}
                checked={item.status}
              />
              {item.task}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
