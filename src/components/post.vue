<template>
    <div v-if="currentMenu === 'post'">
      <!-- Form Post -->
      <form @submit.prevent="submitPost">
        <div>
          <label for="userSelect">Pilih User:</label>
          <select id="userSelect" v-model="selectedUser">
            <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
          </select>
        </div>
        <button type="submit">Submit</button> <!-- Memperbaiki agar tombol memiliki tipe "submit" -->
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['users', 'selectedUser', 'currentMenu'],
    methods: {
      submitPost() {
        this.$emit('submit-post', this.selectedUser);
        this.selectedUser = ''; // Reset selected user
      }
    }
  }
  </script>
  
  <style>
  /* styles here */
  </style>
  
  