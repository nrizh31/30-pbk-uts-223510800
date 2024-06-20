<template>
  <div class="post-form">
    <h1 :class="greetingClass">{{ greeting }}</h1>
    <div class="albums-container">
      <router-link v-for="album in albums" :key="album.id" :to="'/albums/' + album.id">
        <div class="album-item">
          <div class="album-card">
            <h2>{{ album.title }}</h2>
            <div class="album-thumbnails">
              <img v-for="(photoId, index) in getAlbumPhotoIds(album.id).slice(0, 4)" :key="index" :src="getPhotoThumbnailUrl(photoId)" :alt="getPhotoTitle(photoId)">
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
        const albumsResponse = await fetch('http://localhost:3000/albums');
        if (albumsResponse.ok) {
          albums.value = await albumsResponse.json();
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
      return photo ? photo.thumbnailUrl : 'https://via.placeholder.com/100x100';
    }

    function getPhotoTitle(photoId) {
      const photo = photos.value.find(photo => photo.id === photoId);
      return photo ? photo.title : '';
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
  text-align: center;
}

.album-greeting {
  font-family: Cambria, serif;
  font-size: 24px; /* Adjust size as needed */
}

.albums-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.album-item {
  flex: 1 1 45%;
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
  font-family: Cambria, serif; /* Ensure h2 also uses Cambria */
}

.album-thumbnails {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.album-thumbnails img {
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.album-thumbnails img:hover {
  transform: scale(1.1);
}

/* Ensure h1 uses Cambria */
h1 {
  font-family: Cambria, serif;
  font-size: 24px; /* Adjust size as needed */
}
</style>
