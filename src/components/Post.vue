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
      users: [],
      selectedUser: ''
    }
  },
  methods: {
    async submitPost() {
      if (!this.selectedUser) return;
      
      try {
        const response = await fetch('https://my-json-server.typicode.com/nrizh31/30-pbk-uts-223510800/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: this.selectedUser.id,
            title: 'New Post',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit post');
        }
        
        alert(`Post submitted for user: ${this.selectedUser.name}`);
        this.selectedUser = '';
      } catch (error) {
        console.error('Error submitting post:', error);
        alert('Failed to submit post. Please try again later.');
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/nrizh31/30-pbk-uts-223510800/post');
        if (response.ok) {
          const data = await response.json();
          this.users = data;
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers();
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
