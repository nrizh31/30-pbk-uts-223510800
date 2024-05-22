<template>
    <div v-if="currentMenu === 'todo'">
      <!-- Form Todo -->
      <form @submit.prevent="addTask">
        <input type="text" v-model="newTask" placeholder="Tambahkan Kegiatan Baru">
        <button>Tambahkan</button>
      </form>
      <!-- Daftar Todo -->
      <ul>
        <li v-for="(task, index) in tasks" :key="index" class="task-item">
          <button @click="completeTask(index)" :class="{ completedButton: task.completed }">
            <span style="color: #fff;">✔️</span>
          </button>
          <span @click="completeTask(index)" :class="{ completed: task.completed }">{{ task.title }}</span>
          <button @click="deleteTask(index)">Hapus</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['tasks', 'newTask', 'currentMenu'],
    methods: {
      addTask() {
        if (this.newTask.trim() !== '') {
          this.$emit('add-task', this.newTask);
          this.newTask = '';
        }
      },
      completeTask(index) {
        this.$emit('complete-task', index);
      },
      deleteTask(index) {
        this.$emit('delete-task', index);
      }
    }
  }
  </script>
  
  <style>
  /* styles here */
  </style>
  