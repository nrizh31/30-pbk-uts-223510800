<template>
  <div class="post-form">
    <form ref="postForm">
      <label for="userSelect">Pilih Pemain Timnas:</label>
      <select id="userSelect" v-model="selectedUserId" @change="showUserDetails" required>
        <option value="" selected disabled>Select Player</option>
        <option v-for="user in users" :key="user.userId" :value="user.userId">{{ user.title }}</option>
      </select>
      <div v-if="selectedUser" class="user-details">
        <h2>{{ selectedUser.title }}</h2>
        <p>{{ selectedUser.body }}</p>
      </div>
    </form>
    <div v-if="submittedData">
      <h3>Submitted Data:</h3>
      <pre>{{ submittedData }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      selectedUser: null,
      submittedData: null
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/nrizh31/30-pbk-uts-223510800/post');
        if (response.ok) {
          const data = await response.json();
          this.users = data;
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Failed to fetch posts. Please refresh the page.');
      }
    },
    showUserDetails() {
      this.selectedUser = this.users.find(user => user.userId === this.selectedUserId);
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style scoped>
.post-form {
  font-family: 'Cambria', serif; /* Menambahkan font-family untuk seluruh form */
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 60%;
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

.post-form .user-details {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.post-form .user-details p {
  font-size: 18px; /* Memperbesar ukuran teks dalam elemen body */
}
</style>
