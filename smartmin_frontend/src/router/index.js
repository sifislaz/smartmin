import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "Home - Smartmin",
    }
  },
  {
    path:'/admin/login',
    name:'login',
    component:LoginView,
    meta: {
      title: "Login - Smartmin"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,_,next)=>{
  document.title = `${to.meta.title}`;
  next();
});

export default router
