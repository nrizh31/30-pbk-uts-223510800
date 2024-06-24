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
      formattedDateTime: ''
    }
  },
  created() {
    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta',
        hour12: false,
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
.app-layout {
  background-image: url('./assets/gbk3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Tambahkan ini */
  height: 100vh;
}

.bg-red {
  background-color: #c80000;
}

.q-tabs__item--active {
  border-bottom: 2px solid white;
}

.q-ml-auto {
  margin-left: auto;
}

.q-mr-md {
  margin-right: 20px;
  text-align: right;
}
</style>
