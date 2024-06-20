<template>
  <div class="album-detail">
    <h2>{{ album.title }}</h2>
    <div class="album-photos">
      <img v-for="photo in album.photos" :key="photo.id" :src="photo.thumbnailUrl" :alt="photo.title" @click="viewPhoto(photo)">
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'AlbumDetail',
  setup() {
    const album = ref(null);
    const photos = ref([]);

    const route = useRoute();

    onMounted(async () => {
      const albumId = route.params.id;
      try {
        const albumResponse = await fetch(`http://localhost:3000/albums/${albumId}`);
        if (albumResponse.ok) {
          album.value = await albumResponse.json();
          console.log('Album fetched:', album.value);

          // Ambil foto-foto yang ada di album ini
          photos.value = await fetch(`http://localhost:3000/photos?albumId=${albumId}`).then(response => response.json());
          console.log('Photos fetched:', photos.value);
        } else {
          console.error('Failed to fetch album:', albumResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch album:', error);
      }
    });

    // Fungsi untuk menampilkan foto dalam ukuran sebenarnya
    function viewPhoto(photo) {
      // Navigasi ke halaman detail foto dengan menyediakan properti `url`
      router.push({ path: `/photos/${photo.id}`, query: { url: photo.url } });
    }

    return { album, photos, viewPhoto };
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
  font-family: Cambria, serif;
  text-align: center;
}

.album-detail h2 {
  font-size: 24px;
}

.album-photos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px; /* Jarak antara foto */
}

.album-photos img {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.album-photos img:hover {
  transform: scale(1.1);
}
</style>
