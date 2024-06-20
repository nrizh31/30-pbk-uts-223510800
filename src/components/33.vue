<script>
import { ref, onMounted, computed } from 'vue';
import { BCardGroup, BCard, BCardText } from 'bootstrap-vue';

export default {
  props: ['id'],
  components: {
    BCardGroup,
    BCard,
    BCardText,
  },
  setup(props) {
    const album = ref({});
    const albumPhotos = ref([]);

    // Mengambil data album berdasarkan ID dari props
    onMounted(async () => {
      try {
        const albumResponse = await fetch(`http://localhost:3000/albums/${props.id}`);
        if (albumResponse.ok) {
          album.value = await albumResponse.json();
          console.log('Album fetched:', album.value); // Debug
        } else {
          console.error('Gagal mengambil data album:', albumResponse.statusText);
        }
      } catch (error) {
        console.error('Gagal mengambil data album:', error);
      }

      try {
        const photosResponse = await fetch('http://localhost:3000/photos');
        if (photosResponse.ok) {
          albumPhotos.value = await photosResponse.json();
          console.log('Photos fetched:', albumPhotos.value); // Debug
        } else {
          console.error('Gagal mengambil data foto:', photosResponse.statusText);
        }
      } catch (error) {
        console.error('Gagal mengambil data foto:', error);
      }
    });

    // Mengambil foto-foto yang terkait dengan album ini
    const filteredPhotos = computed(() => {
      return albumPhotos.value.filter(photo => photo.albumId === props.id);
    });

    return { album, albumPhotos: filteredPhotos };
  }
};
</script>
