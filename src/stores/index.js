import { defineStore } from 'pinia';

export const useTaskStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    completeTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
  },
  getters: {
    incompleteTaskCount: (state) => {
      return state.tasks.filter(task => !task.completed).length;
    },
  },
});
