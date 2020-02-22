import Todos from "./Todos";
import { createRexStore } from "rex-state";

const store = createRexStore({
  todos: Todos
});

export default store;
