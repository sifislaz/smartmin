<template>
    <NavPanel/>
    <v-sheet color="bgLight" class="w-100 h-100">
        <h1 class="text-primary text-center">Alerts</h1>
        <template v-for="alert in alerts" :key="alert._id">
            <div class="mt-2">
                <v-banner icon="mdi-exclamation-thick" :color="alert.severity!=='Hazard'?alert.severity!=='Medium'?'alertGreen':'alertOrange':'alertRed'" class="mb-2 w-75 mx-auto">
                    <template v-slot:text>
                        <div class="text-black font-weight-bold text-uppercase d-md-block d-lg-inline">{{alert.title}}</div>
                        <div class="text-black ml-lg-1 d-md-block d-lg-inline">{{alert.body}} <span class="text-secondary">{{alert.origin}}</span></div>
                        <div class="text-grey ml-lg-1 d-md-block d-lg-inline">{{alert.datetime}}</div>
                        <div class="text-grey ml-lg-1 d-md-block d-lg-inline float-right" v-if="!alert.isRead"><v-btn color="secondary" @click="readAlert(alert._id)">Read</v-btn></div>
                    </template>
                </v-banner>
            </div>
        </template>
        <v-btn color="secondary" class="mx-auto my-2 d-block" @click="readAllAlerts">Read All</v-btn>
        <v-pagination v-model="currentPage" :length="totalPages" @update:model-value="handlePageChange" rounded="circle" color="secondary"></v-pagination>
    </v-sheet>
    <FooterBar/>
</template>

<script>
import NavPanel from '@/components/NavPanel'
import FooterBar from '@/components/FooterBar.vue';
import axios from 'axios';

export default{
    name:'AlertsView',
    components: {
        NavPanel,
        FooterBar,
    },

    data: ()=>({
        alerts:[],
        timer: null,
        currentPage:1,
        totalPages:0,
    }),
    async created(){
        this.fetchAlerts();
        this.timer = setInterval(this.fetchAlerts, 60*1000*2);  // fetch every 2 minutes
    },
    beforeUnmount(){
        this.cancelUpdate();
    },
    methods:{
        async fetchAlerts(){
            let alertsRes = null;
            try{
                alertsRes = await axios.get(`http://localhost:3000/data/alerts?pageNumber=${this.currentPage}&pageSize=5`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                this.alerts = alertsRes.data.alerts
                this.totalPages = alertsRes.data.totalPages
            }
            catch(e){
                console.log(e);
            }
        },
        cancelUpdate(){
            clearInterval(this.timer);
        },
        handlePageChange(page){
            this.currentPage = page;
            this.fetchAlerts();
        },
        async readAlert(alertId){
            try{
                await axios.post(`http://localhost:3000/data/alerts/${alertId}`,{},{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                this.fetchAlerts();
            }
            catch(e){
                console.log(e);
            }
        },
        async readAllAlerts(){
            try{
                await axios.post(`http://localhost:3000/data/alerts`,{},{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                this.fetchAlerts();
            }
            catch(e){
                console.log(e);
            }
            
        }
    }

    
}
</script>