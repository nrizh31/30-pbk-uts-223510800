<template>
  <div class="post-form">
    <form @submit.prevent="submitPost">
      <label for="userSelect">Pilih User:</label>
      <select id="userSelect" v-model="selectedUser" required>
        <option value="" disabled>Pilih User</option>
        <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'Naufal Rizh' },
        { id: 2, name: 'Aldo Albert' },
        { id: 3, name: 'Teguh Starboy' },
        { id: 4, name: 'Rifky Fxrusy' },
      ],
      selectedUser: ''
    }
  },
  methods: {
    submitPost() {
      alert(`Post submitted for user: ${this.selectedUser.name}`);
      this.selectedUser = '';
    }
  }
}
</script>

<style scoped>
.post-form {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.post-form form {
  display: flex;
  flex-direction: column;
}

.post-form label {
  margin-bottom: 10px;
  font-weight: bold;
}

.post-form select {
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
}

.post-form button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.post-form button:hover {
  background-color: #45a049;
}
</style>
