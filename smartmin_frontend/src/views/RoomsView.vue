<template>
    <NavPanel/>
    <v-sheet color="bgLight" class="w-100 h-100">
        <h1 class="text-primary text-center" :class="$route.params.room==='wc'?'text-uppercase':'text-capitalize'">{{$route.params.room!=='conf'?$route.params.room!=='break'?$route.params.room:'Break Room':'Conference Room'}} {{$route.params.id}}</h1>
        <!-- <div class="rounded-pill bg-bgDark mx-auto my-4 d-flex justify-center w-25">
            <v-btn variant="text" color="secondary" :to="'./'+$route.params.id+'/graph/temperature'">
                Temperature Graph
            </v-btn>
            <v-btn variant="text" color="secondary" :to="'./'+$route.params.id+'/graph/humidity'">
                Humidity Graph
            </v-btn>
        </div> -->
        <v-card class="bg-bgDark rounded-shaped">
            <v-tabs v-model="tab" bg-color="secondary">
                <v-tab value="settings">Settings</v-tab>
                <v-tab value="temp">Temperature Graph</v-tab>
                <v-tab value="humid">Humidity Graph</v-tab>
            </v-tabs>
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="settings">
                        <h2 class="text-secondary text-center">Settings</h2>
                        <div v-for="sensor in sensors" :key="sensor.name" class="bg-primary rounded-lg pa-4 my-2 d-flex justify-center align-center w-50 mx-auto">
                            <span class="text-white text-h5">{{sensor.name}}</span>
                            <v-switch :model-value="sensor.switch" color="switchGreen" class="ml-5" inset hide-details></v-switch>
                            <a :href="$route.params.room==='office'?'./'+$route.params.id+'/settings/'+sensor.settings:'./'+$route.params.room+'/settings/'+sensor.settings" class="text-white">Settings</a>
                        </div>
                    </v-window-item>
                    <v-window-item value="temp">
                        Temperature
                    </v-window-item>
                    <v-window-item value="humid">
                        Humidity
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-sheet>
    <FooterBar/>

</template>

<script>
import NavPanel from '../components/NavPanel'
import FooterBar from '../components/FooterBar'

export default{
    name: 'RoomsView',
    components:{
        NavPanel,
        FooterBar
    },
    data: ()=>({
        tab: null,
        sensors:[
            {name:"Lights", switch:false, settings:'lights'},
            {name:"Smart Lock", switch:true, settings:'lock'},
            {name:"Alarm", switch:true, settings:'alarm'}
        ]

    }),
    
}
</script>