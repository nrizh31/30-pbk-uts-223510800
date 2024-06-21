<template>
  <div class="album-detail">
    <h1 class="album-title">{{ albumTitle }}</h1>
    <div class="photo-thumbnails">
      <img v-for="photo in albumPhotos.slice(0, 10)" :key="photo.id" :src="photo.thumbnailUrl" @click="viewFullSize(photo.url)">
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'AlbumDetail',
  setup() {
    const route = useRoute();
    const albumTitle = ref('');
    const albumPhotos = ref([]);

    onMounted(async () => {
      const { albumId } = route.params;

      // Fetch album details
      try {
        const albumsResponse = await fetch('https://github.com/nrizh31/db.json.git');
        if (albumsResponse.ok) {
          const albums = await albumsResponse.json();
          const album = albums.find(album => album.id == albumId);
          if (album) {
            albumTitle.value = album.title;
          }
        } else {
          console.error('Failed to fetch albums:', albumsResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }

      // Fetch photos for the current album
      try {
        const photosResponse = await fetch(`https://github.com/nrizh31/db.json.git`);
        if (photosResponse.ok) {
          albumPhotos.value = await photosResponse.json();
        } else {
          console.error('Failed to fetch photos:', photosResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      }
    });

    function viewFullSize(url) {
      window.open(url, '_blank');
    }

    return { albumTitle, albumPhotos, viewFullSize };
  }
};
</script>

<style scoped>
.album-detail {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 40px 20px;
  border-radius: 8px;
  width: 900px;
  margin: 50px auto 90px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.album-title {
  font-family: Cambria, serif;
  font-size: 30px; /* Adjust size as needed */
}

.photo-thumbnails {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.photo-thumbnails img {
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.photo-thumbnails img:hover {
  transform: scale(1.1);
}
</style>
