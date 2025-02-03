// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Start from './components/Start.vue' // Importera dina vyer
// import About from '../views/About.vue'
// import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', component: Start }
  // { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
