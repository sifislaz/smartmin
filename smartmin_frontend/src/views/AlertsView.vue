<template>
    <NavPanel/>
    <v-sheet color="bgLight" class="w-100 h-100">
        <h1 class="text-primary text-center">Alerts</h1>
        <template v-for="alert in alerts.alerts" :key="alert.id">
            <div class="mt-2">
                <v-banner icon="mdi-exclamation-thick" :color="alert.severity!=='Hazard'?alert.severity!=='Medium'?'alertGreen':'alertOrange':'alertRed'" class="mb-2 w-75 mx-auto">
                    <template v-slot:text>
                        <div class="text-black font-weight-bold text-uppercase d-md-block d-lg-inline">{{alert.title}}</div>
                        <div class="text-black ml-lg-1 d-md-block d-lg-inline">{{alert.body}} <span class="text-secondary">{{alert.room}}</span></div>
                        <div class="text-grey ml-lg-1 d-md-block d-lg-inline">{{alert.datetime}}</div>
                    </template>
                </v-banner>
            </div>
        </template>
        <v-pagination v-model="alerts.currentPage" :length="alerts.totalPages" rounded="circle" color="secondary"></v-pagination>
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
        alerts:[]
    }),
    async created(){
        this.fetchAlerts()
    },
    methods:{
        async fetchAlerts(){
            let alertsRes = null;
            try{
                alertsRes = await axios.get("http://localhost:5000/alerts");
                this.alerts = alertsRes.data
            }
            catch(e){
                console.log(e);
            }
        }
    }

    
}
</script>