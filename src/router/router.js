import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'
import Category from '../views/Category.vue'
// import About from '../views/About.vue'
// import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', component: Start },
  { path: '/category/:categoryName', component: Category, props: true }
  // { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
