<template>
  <div class="post-form">
    <h1>{{ greeting }}</h1>
    <div class="albums-container">
      <div v-for="album in albums" :key="album.id" class="album-item">
        <router-link :to="'/albums/' + album.id">
          <div class="album-card">
            <h2>{{ album.title }}</h2>
            <div class="album-thumbnails">
              <img v-for="photoId in getAlbumPhotoIds(album.id)" :key="photoId" :src="getPhotoThumbnailUrl(photoId)" :alt="getPhotoTitle(photoId)">
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const greeting = 'Album Foto';
    const albums = ref([]);
    const photos = ref([]);

    onMounted(async () => {
      try {
        const albumsResponse = await fetch('http://localhost:3000/albums');
        if (albumsResponse.ok) {
          const allAlbums = await albumsResponse.json();
          albums.value = allAlbums.slice(0, 2); // Mengambil hanya 2 album pertama
          console.log('Albums fetched:', albums.value);
        } else {
          console.error('Failed to fetch albums:', albumsResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }

      try {
        const photosResponse = await fetch('http://localhost:3000/photos');
        if (photosResponse.ok) {
          photos.value = await photosResponse.json();
          console.log('Photos fetched:', photos.value);
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

    function getPhotoThumbnailUrl(photoId) {
      const photo = photos.value.find(photo => photo.id === photoId);
      return photo ? photo.thumbnailUrl : 'https://via.placeholder.com/100x100'; // Placeholder jika foto tidak ditemukan
    }

    function getPhotoTitle(photoId) {
      const photo = photos.value.find(photo => photo.id === photoId);
      return photo ? photo.title : ''; // Mengembalikan judul foto
    }

    return { greeting, albums, getAlbumPhotoIds, getPhotoThumbnailUrl, getPhotoTitle };
  }
};
</script>

<style scoped>
.post-form {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 40px 20px;
  border-radius: 8px;
  width: 900px;
  margin: 50px auto 90px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: Cambria, serif;
  text-align: center;
}

.post-form h1 {
  font-size: 30px;
}

.albums-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Jarak antara album-item */
}

.album-item {
  flex: 1 1 45%; /* Lebar album-item */
  margin-bottom: 20px;
}

.album-card {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.album-card h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #fff;
}

.album-thumbnails {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Jika ada lebih dari satu thumbnail */
}

.album-thumbnails img {
  width: 100px;
  height: 100px;
  margin: 5px; /* Jarak antara thumbnail */
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.album-thumbnails img:hover {
  transform: scale(1.1);
}
</style>
