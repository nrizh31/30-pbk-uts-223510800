<template>
  <div class="app-container">
    <div class="todo-container">
      <h1 class="todo-list-title">
        TODO LIST
      </h1>
      <form @submit.prevent="addTask" class="form-inline">
        <input type="text" v-model="newTask" placeholder="Tambahkan Kegiatan Baru">
        <button type="submit">Tambahkan</button>
      </form>
      <ul>
        <li v-for="(task, index) in tasksFiltered" :key="index" :class="{ completed: task.completed }">
          <span @click="completeTask(index)" :style="{ textDecoration: task.completed ? 'line-through' : 'none' }" class="task-title">
            {{ task.title }}
          </span>
          <button @click="completeTask(index)" class="check-btn">{{ task.completed ? 'Belum Selesai' : 'Selesai' }}</button>
          <button @click="showModal = true; taskIndexToDelete = index" class="delete-btn">Hapus</button>
        </li>
      </ul>
      <p class="task-count">
        Jumlah tugas yang belum selesai: {{ incompleteTaskCount }}
      </p>
    </div>
    <div class="modal-background" v-if="showModal">
      <div class="modal">
        <p>Apakah Anda yakin ingin menghapus tugas ini?</p>
        <button @click="deleteTaskConfirmed">Ya</button>
        <button @click="closeModal">Tidak</button>
      </div>
    </div>
  </div>
</template>


<script>
import { useTaskStore } from '../stores/indexStores';
import { ref, computed } from 'vue';

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref('');
    const showModal = ref(false);
    const taskIndexToDelete = ref(null);

    const addTask = () => {
      if (newTask.value.trim()) {
        taskStore.addTask({ title: newTask.value, completed: false });
        newTask.value = '';
      }
    };

    const completeTask = (index) => {
      taskStore.completeTask(index);
    };

    const deleteTaskConfirmed = () => {
      taskStore.deleteTask(taskIndexToDelete.value);
      closeModal();
    };

    const closeModal = () => {
      showModal.value = false;
      taskIndexToDelete.value = null;
    };

    const tasksFiltered = computed(() => {
      return taskStore.tasks;
    });

    const incompleteTaskCount = computed(() => {
      return taskStore.incompleteTaskCount;
    });

    return {
      newTask,
      addTask,
      completeTask,
      deleteTaskConfirmed,
      closeModal,
      tasksFiltered,
      incompleteTaskCount,
      showModal
    };
  }
};
</script>

<style>
button[type="submit"] {
  border-radius: 5px;
  margin-left: 20px !important; /* Menambahkan jarak antara tombol dan kolom input */
}

.task-title, .task-count {
  font-family: Tahoma, sans-serif; /* Mengatur font family */
}

.todo-list-title {
  font-family: "Courier New", Courier, monospace;
  text-align: center; /* Menengahkan teks TODO LIST */
}

.author-name {
  font-size: 14px; /* Mengurangi ukuran font menjadi 14px */
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Mengubah dari 10 0% menjadi 100% */
  height: 100%;
}

.by-text {
  font-family: "Courier New", Courier, monospace;
  font-size: 20px; /* Mengatur ukuran font */
}

.todo-container {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 20px; /* Sesuaikan dengan kebutuhan Anda */
  border-radius: 20px; /* Sesuaikan dengan kebutuhan Anda */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px; /* Sesuaikan dengan kebutuhan Anda */
  width: 100%;
  margin-top: 50px;
}


.delete-btn,
.check-btn,
input[type="text"] {
  border-radius: 5px; /* Melengkungkan pinggir button delete, check, dan kolom input */
}

form {
  display: flex;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1; /* Menggunakan flex untuk membuat input memanjang dan menyesuaikan ukuran */
  padding: 10px; /* Menambahkan padding agar input lebih berjarak dengan tombol */
  font-size: 16px; /* Mengatur ukuran font input */
  border-radius: 5px; /* Melengkungkan pinggir kolom input */
  border: none; /* Menghapus border default */
  margin-right: 10px; /* Memberikan jarak antara input dan tombol */
}

button {
  padding: 5px 10px;
  font-size: 16px;
  background-color: #009688;
  color: #fff; /* Mengatur warna teks tombol menjadi putih */
  border: none;
  cursor: pointer;
}

button.check-btn {
  background-color: #009688;
  margin-left: 10px;
}

button.delete-btn {
  background-color: red;
  margin-left: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-top: 10px; /* Atur nilai margin-top sesuai keinginan Anda */
  margin-bottom: 10px;
}

li.completed span {
  text-decoration: line-through;
}

li span {
  flex: 1;
  cursor: pointer;
  color: #fff; /* Mengatur warna teks tugas menjadi putih */
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.modal button {
  margin: 0 10px;
}

.task-count {
  text-align: center; /* Menengahkan teks Jumlah tugas yang belum selesai */
}
</style>
