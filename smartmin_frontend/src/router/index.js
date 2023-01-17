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
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            title: "Login - Smartmin",
            guest:true
        }
    },
    {
        path:'/logout',
        name:'logout',
        meta:{
            admin:true,
            logout:true
        }
    },
    {
        path: '/alerts',
        name: 'alerts',
        component: AlertsView,
        meta: {
            title: "Alerts - Smartmin",
            admin: true
        }
    },
    {
        path: '/rooms/:id',
        name: 'Office',
        component: RoomsView,
        meta: {
            title: "- Smartmin",
            admin: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, _, next) => {
    if (to.matched.some(record => record.meta.admin)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path:'/login',
            })
        }
        else if(to.matched.some(record=>record.meta.logout)){
            localStorage.removeItem('jwt');
            next({
                path:'/'
            });
        }
        else{
            next();
        }
    }
    else if(to.matched.some(record => record.meta.guest)){
        if(localStorage.getItem('jwt') == null){
            next();
        }
        else{
            next({name:'home'});
        }
    }
    else{
        next();
    }
})


router.beforeEach((to, _, next) => {
    let pageTitle = "";
    if (to.params) {
        switch (to.params['id']) {
            case "63c04af69e05d8e5a0fa0a23":
                pageTitle = "Office 1 ";
                break;
            case "63c04afa9e05d8e5a0fa0a25":
                pageTitle = "Office 2 ";
                break;
            case "63c04b089e05d8e5a0fa0a27":
                pageTitle = "Storage ";
                break;
            default:
                pageTitle = "";
                break;
        }
    }
    document.title = `${pageTitle + to.meta.title}`;
    next();
});

export default router
