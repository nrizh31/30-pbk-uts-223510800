<template>
  <q-layout view="hHh lpR fFf" class="app-layout">
    <q-header elevated class="bg-red text-white" style="min-height: 120px;">
      <q-toolbar>
        <q-toolbar-title class="q-ml-auto q-mr-md">{{ formattedDateTime }}</q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center" class="justify-center" style="flex: 1;">
        <q-route-tab to="/todos" label="Todo" :exact="true" />
        <q-route-tab to="/post" label="Post" :exact="true" />
        <q-route-tab to="/albums" label="Albums" :exact="true" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentMenu: 'todos', // Menu default adalah Todo
      currentTimeInterval: null,
      formattedDateTime: ''
    }
  },
  created() {
    // Redirect to "/todos" when component is created
    this.$router.push('/todos');

    // Set interval to update current time every second
    this.currentTimeInterval = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  },
  destroyed() {
    // Clear interval when component is destroyed to prevent memory leaks
    clearInterval(this.currentTimeInterval);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta', // Set timezone to WIB (Western Indonesia Time)
        hour12: false, // Use 24-hour format
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      this.formattedDateTime = now.toLocaleString('id-ID', options);
    }
  }
}
</script>

<style scoped>
/* Gaya khusus untuk komponen Vue Anda */
.app-layout .bg-red {
  background-color: #c80000; /* Warna merah */
}

.q-tabs__item--active {
  border-bottom: 2px solid white; /* Menambahkan garis bawah putih untuk tab aktif */
}

.q-ml-auto {
  margin-left: auto; /* Memindahkan ke kanan dengan margin-left:auto */
}

.q-mr-md {
  margin-right: 20px; /* Memberikan margin kanan */
  text-align: right; /* Menyebarkan teks ke kanan */
}
</style>
