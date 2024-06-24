import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Post from '../components/Post.vue';
import Albums from '../components/Albums.vue';
import AlbumDetail from '../components/AlbumDetail.vue'; // Pastikan path sesuai dengan struktur aplikasi Anda

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/post', component: Post },
  { path: '/albums', component: Albums },
  { path: '/albums/:albumId', component: AlbumDetail, name: 'AlbumDetail' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
