import { createRouter, createWebHistory } from 'vue-router';
import Start from '../views/Start.vue';
import Category from '../views/Category.vue';
import GardenOverview from '../views/GardenOverview.vue';
import ArticlesAndInspo from '../views/ArticlesAndInspo.vue';
import Article from '../views/Article.vue';
import Calendar from '../views/Calendar.vue';
import UploadImg from '../views/UploadImg.vue';

const routes = [
  { path: '/', component: Start },
  { path: '/category/:categoryName', component: Category, props: true },
  { path: '/gardenoverview', component: GardenOverview },
  { path: '/articlesandinspo', component: ArticlesAndInspo },
  { path: '/article/:articleID', component: Article, props: true },
  { path: '/calendar', component: Calendar },
  { path: '/uploadimg', component: UploadImg }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
