<template>
  <div class="post-form">
    <form ref="postForm">
      <label for="userSelect">Pilih Nama Pengguna:</label>
      <select id="userSelect" v-model="selectedUserId" @change="handleChange" required>
        <option value="" selected disabled>Select Player Timnas</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.title }}</option>
      </select>
    </form>

    <div class="user-details" v-if="selectedUser">
      <h2>{{ selectedUser.title }}</h2>
      <p class="body-text">{{ selectedUser.body }}</p>
    </div>

    <div v-if="loading" class="spinner-container">
      <q-spinner-bars color="red" size="50px"></q-spinner-bars>
    </div>

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
      submittedData: null,
      loading: false
    };
  },
  methods: {
    async fetchUsers() {
      try {
        this.loading = true;
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (response.ok) {
          const data = await response.json();
          this.users = data;
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users. Please refresh the page.');
      } finally {
        // Delay the loading indicator reset
        setTimeout(() => {
          this.loading = false;
        }, 3000); // Delay in milliseconds (adjust as needed)
      }
    },
    async showUserDetails() {
      try {
        this.loading = true;
        const selectedUser = this.users.find(user => user.id === this.selectedUserId);
        if (selectedUser) {
          this.selectedUser = selectedUser;
        } else {
          throw new Error('User details not found');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details.');
      } finally {
        // Delay the loading indicator reset
        setTimeout(() => {
          this.loading = false;
        }, 3000); // Delay in milliseconds (adjust as needed)
      }
    },
    handleChange() {
      this.selectedUser = null;
      this.showUserDetails();
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.post-form {
  font-family: 'Cambria', serif;
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
  background-color: #cfa0a0;
  color: #000;
}

.user-details {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: justify; /* Rata kiri-kanan */
}

.user-details h2 {
  font-size: 30px; /* Besarkan judul */
  text-align: center; /* Pusatkan judul */
}

.body-text {
  font-size: 20px; /* Besarkan teks badan */
  text-align: justify; /* Rata kiri-kanan */
}

.spinner-container {
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.q-spinner-bars {
  display: inline-block;
}
</style>
