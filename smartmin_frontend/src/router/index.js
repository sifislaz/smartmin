import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AlertsView from '../views/AlertsView.vue'

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
  },
  {
    path: '/admin/alerts',
    name: 'alerts',
    component:AlertsView,
    meta: {
      title: "Alerts - Smartmin"
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
