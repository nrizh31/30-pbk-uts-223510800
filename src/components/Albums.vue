<template>
    <div>
      <!-- Kode template Anda di sini -->
      <h1>{{ greeting }}</h1>
      <p v-for="album in albums" :key="album.id">{{ album.title }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        greeting: 'Halo dari komponen Albums',
        albums: [
          { id: 1, title: 'Album 1' },
          { id: 2, title: 'Album 2' },
          { id: 3, title: 'Album 3' }
        ]
      };
    }
  };
  </script>
  
  <style>
  /* Gaya CSS Anda di sini */
  </style>
  