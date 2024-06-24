<template>
  <div class="post-form">
    <h1>{{ greeting }}</h1>
    <div class="albums-container">
      <router-link v-for="album in albums" :key="album.id" :to="'/albums/' + album.id" class="album-link">
        <div class="album-item">
          <div class="album-card">
            <h2>{{ album.title }}</h2>
            <div class="album-cover">
              <img :src="getAlbumCoverUrl(album.id)" :alt="album.title">
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Albums',
  setup() {
    const greeting = 'Album Foto';
    const albums = ref([]);
    const photos = ref([]);

    onMounted(async () => {
      try {
        const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (albumsResponse.ok) {
          const albumsData = await albumsResponse.json();
          albums.value = albumsData;
        } else {
          console.error('Failed to fetch albums:', albumsResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }

      try {
        const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos'); // Perbaiki URL fetch photos
        if (photosResponse.ok) {
          const photosData = await photosResponse.json();
          photos.value = photosData;
        } else {
          console.error('Failed to fetch photos:', photosResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      }
    });

    function getAlbumPhotoIds(albumId) {
      const album = albums.value.find(album => album.id === albumId);
      return album ? album.photoIds || [] : [];
    }

    function getAlbumCoverUrl(albumId) {
      const photoId = getAlbumPhotoIds(albumId)[0]; // Ambil foto pertama dari album
      const photo = photos.value.find(photo => photo.id === photoId);
      return photo ? photo.thumbnailUrl : 'https://via.placeholder.com/200x200'; // Placeholder jika tidak ada foto
    }

    return { greeting, albums, getAlbumCoverUrl };
  }
};
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

.post-form {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%; /* Lebar disesuaikan agar responsif */
  max-width: 1200px; /* Maksimum lebar untuk memastikan tidak terlalu lebar */
  margin: 50px auto 90px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.albums-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.album-link {
  flex: 1 1 30%; /* Lebar item disesuaikan agar 3 kolom per baris */
  max-width: 300px; /* Maksimum lebar item */
}

.album-item {
  margin-bottom: 20px;
}

.album-card {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.album-card h2 {
  font-size: 18px; /* Ukuran font h2 yang lebih kecil */
  margin-bottom: 10px;
  color: #fff;
  font-family: Cambria, serif; /* Ensure h2 also uses Cambria */
}

.album-cover img {
  width: 100%; /* Lebar gambar 100% dari parent */
  height: auto; /* Tinggi disesuaikan agar proporsi gambar tetap terjaga */
  object-fit: cover; /* Memastikan gambar diisi sesuai dengan ukuran tanpa distorsi */
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.album-cover img:hover {
  transform: scale(1.05); /* Perbesar sedikit saat hover */
}

h1 {
  font-family: Cambria, serif;
  font-size: 32px; /* Ukuran font h1 yang lebih kecil */
  margin-bottom: 20px;
}
</style>
