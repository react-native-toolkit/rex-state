import Rex from "@t/rex";

export interface ITask {
  task: string;
  status: boolean;
}

export interface ITodosRexState {
  list: ITask[];
}

class Todos extends Rex {
  state = {
    list: [
      {
        task: "Task One",
        status: false
      },
      {
        task: "Task Two",
        status: false
      }
    ]
  };

  addTask = (newTask: string) => {
    const newTaskObject = {
      task: newTask,
      status: false
    };
    const list: ITask[] = [...this.state.list, newTaskObject];
    this.setState({ list });
  };

  get list() {
    return this.state.list;
  }
}

export default Todos;
