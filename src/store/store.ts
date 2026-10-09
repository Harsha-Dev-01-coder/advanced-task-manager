import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/taskSlice";
import { loadTasks, saveTasks } from "../utils/taskStorage";

// Restore tasks from localStorage when the store initializes
const preloadedTasks = loadTasks();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: {
      tasks: preloadedTasks,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Save tasks whenever the Redux state changes
store.subscribe(() => {
  saveTasks(store.getState().tasks.tasks);
});