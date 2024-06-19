import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Post from '../components/Post.vue';
import Albums from '../components/Albums.vue';

const routes = [
  { path: '/Todos', component: Todos },
  { path: '/Post', component: Post },
  { path: '/Albums', component: Albums }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
