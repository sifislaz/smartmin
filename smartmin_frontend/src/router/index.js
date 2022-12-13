import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AlertsView from '../views/AlertsView.vue'
import RoomsView from '../views/RoomsView.vue'

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
  },
  {
    path: '/rooms/:room/:id?',
    name: 'Office',
    component: RoomsView,
    meta:{
      title: "- Smartmin"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,_,next)=>{
  let pageTitle = "";
  if(to.params){
    for(let param in to.params){
      if(to.params[param]==="wc"){
        pageTitle += `${to.params[param].toUpperCase()} `;
      }
      else if(typeof(to.params[param])==='string' && isNaN(to.params[param])===true){
        pageTitle += `${to.params[param].charAt(0).toUpperCase()+to.params[param].slice(1)} `
      }
      else{
        pageTitle += `${to.params[param]} `
      }
      
    }
  }
  document.title = `${pageTitle + to.meta.title}`;
  next();
});

export default router
