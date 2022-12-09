<template>
    <NavPanel/>
    <v-sheet color="bgLight" class="w-100 h-100">
        <h1 class="text-primary text-center">Alerts</h1>
        <template v-for="alert in alerts.alerts" :key="alert.id">
            <div class="mt-2">
                <v-banner icon="mdi-exclamation-thick" v-if="alert.severity==='Hazard'" color="alertRed" class="mb-2 w-75 mx-auto">
                    <template v-slot:text>
                        <div class="text-black font-weight-bold text-uppercase d-md-block d-lg-inline">{{alert.title}}</div>
                        <div class="text-black ml-lg-1 d-md-block d-lg-inline">{{alert.body}} <span class="text-secondary">{{alert.room}}</span></div>
                        <div class="text-grey ml-lg-1 d-md-block d-lg-inline">{{alert.time}}</div>
                    </template>
                </v-banner>
                <v-banner icon="mdi-exclamation-thick" v-else-if="alert.severity==='Medium'" color="alertOrange" class="my-2 w-75 mx-auto">
                    <template v-slot:text>
                        <div class="text-black font-weight-bold text-uppercase d-md-block d-lg-inline">{{alert.title}}</div>
                        <div class="text-black ml-lg-1 d-md-block d-lg-inline">{{alert.body}} <span class="text-secondary">{{alert.room}}</span></div>
                        <div class="text-grey ml-lg-1 d-md-block d-lg-inline">{{alert.time}}</div>
                    </template>
                </v-banner>
                <v-banner icon="mdi-exclamation-thick" v-else-if="alert.severity==='Good'" color="alertGreen" class="my-2 w-75 mx-auto">
                    <template v-slot:text>
                        <div class="text-black font-weight-bold text-uppercase d-md-block d-lg-inline">{{alert.title}}</div>
                        <div class="text-black ml-lg-1 d-md-block d-lg-inline">{{alert.body}} <span class="text-secondary ">{{alert.room}}</span></div>
                        <div class="text-grey ml-lg-1 d-md-block d-lg-inline">{{alert.time}}</div>
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

export default{
    name:'AlertsView',
    components: {
        NavPanel,
        FooterBar,
    },

    data: ()=>({
        alerts:{
            totalItems: 5,
            alerts: [
                {   
                    id: "5",
                    severity: "Hazard",
                    title: "Unauthorized Access",
                    body: "Unauthorized access in",
                    room: "Office 1",
                    time: "2022-12-04 12:30:00"
                },
                {
                    id: "4",
                    severity: "Medium",
                    title: "Temperature Fall",
                    body: "Temperature fell below accepted values in",
                    room: "Reception",
                    time: "2022-12-04 10:25:00"
                },
                {
                    id: "3",
                    severity: "Medium",
                    title: "Temperature Fall",
                    body: "Temperature fell below accepted values in",
                    room: "Reception",
                    time: "2022-12-04 10:25:00"
                },
                {
                    id: "2",
                    severity: "Medium",
                    title: "Temperature Fall",
                    body: "Temperature fell below accepted values in",
                    room: "Reception",
                    time: "2022-12-04 10:25:00"
                },
                {
                    id: "1",
                    severity: "Good",
                    title: "Access Granted",
                    body: "Authorized access in",
                    room: "Storage",
                    time: "2022-12-04 09:45:00"
                },
            ],
            totalPages: 3,
            currentPage: 1

        }
    })

    
}
</script>