<template>
  <div>
    <div class="menu">
      <button @click="switchMenu('todo')" :class="{ active: currentMenu === 'todo' }">Todo</button>
      <button @click="switchMenu('post')" :class="{ active: currentMenu === 'post' }">Post</button>
    </div>
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
    <div v-else-if="currentMenu === 'post'">
      <!-- Form Post -->
      <form @submit.prevent="submitPost">
        <div>
          <label for="userSelect">Pilih User:</label>
          <select id="userSelect" v-model="selectedUser">
            <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { title: 'ngoding', completed: false },
      ],
      newTask: '',
      currentMenu: 'todo', // Default menu adalah Todo
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
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ title: this.newTask, completed: false });
        this.newTask = '';
      }
    },
    completeTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    switchMenu(menu) {
      this.currentMenu = menu;
    },
    submitPost() {
      alert(`Post submitted for user: ${this.selectedUser}`);
      // Reset selected user
      this.selectedUser = '';
    }
  }
}
</script>

<style>
h1 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input[type="text"], select {
  padding: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  font-size: 16px;
  background-color: hsl(249, 85%, 64%);
  color: #fff;
  border: none;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #000; /* Latar belakang hitam */
  color: #fff; /* Warna teks putih */
  border: 1px solid #fff; /* Border putih */
  padding: 10px; /* Padding untuk ruang di dalam border */
}

li span {
  flex: 1;
  cursor: pointer;
}

span.completed {
  text-decoration: line-through;
}

button.completedButton {
  background-color: #4CAF50;
  color: #fff;
  margin-right: 10px;
}

button.completedButton.completed {
  background-color: #009688;
}

.ig-info {
  display: none; /* Menyembunyikan elemen */
}

.menu {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

button.active {
  background-color: #555;
  color: #fff;
}
</style>
