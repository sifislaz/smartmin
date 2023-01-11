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
    path: '/rooms/:id',
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
    // for(let param in to.params){
    //   if(to.params[param]==="wc"){
    //     pageTitle += `${to.params[param].toUpperCase()} `;
    //   }
    //   else if(typeof(to.params[param])==='string' && isNaN(to.params[param])===true){
    //     pageTitle += `${to.params[param].charAt(0).toUpperCase()+to.params[param].slice(1)} `
    //   }
    //   else{
    //     pageTitle += `${to.params[param]} `
    //   }
      
    // }
    switch(to.params['id']){
      case "9bc13":
        pageTitle = "Office 1 ";
        break;
      case "43b11":
        pageTitle = "Office 2 ";
        break;
      case "84c2e":
        pageTitle = "Storage ";
        break;
      default:
        console.log(to.params[0]);
        pageTitle = "Invalid ";
        break;
    }
  }
  document.title = `${pageTitle + to.meta.title}`;
  next();
});

export default router
