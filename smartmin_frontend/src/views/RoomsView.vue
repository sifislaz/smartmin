<template>
    <NavPanel/>
    <v-sheet color="bgLight" class="w-100 h-100">
        <h1 class="text-primary text-center">{{ roomName }}</h1>
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
                        <div v-for="sensor of sensors" :key="sensor.id" class="bg-primary rounded-lg pa-4 my-2 d-flex justify-center align-center w-50 mx-auto">
                            <span class="text-white text-h5">{{sensor.type}}</span>
                            <v-switch :model-value="sensor.value" color="switchGreen" class="ml-5" inset hide-details></v-switch>
                            <a :href="$route.params.id+'/settings/'+sensor.id" class="text-white">Settings</a>
                        </div>
                    </v-window-item>
                    <v-window-item value="temp">
                        <h2 class="text-secondary text-center">Temperature</h2>
                        <div class="d-flex flex-column flex-md-row justify-center align-center mt-2">
                            <ChartComponent dataName="Temperature" :data="temp"/>
                            <v-divider vertical class="mx-2"></v-divider>
                            <OptionsComponent type="temp" :avg-measure="avgTemp" :max-measure="maxTemp" :min-measure="minTemp" @temp="fetchTemp" />
                        </div>
                    </v-window-item>
                    <v-window-item value="humid">
                        <h2 class="text-secondary text-center">Humidity</h2>
                        <div class="d-flex flex-column flex-md-row justify-center align-center mt-2">
                            <ChartComponent dataName="Humidity" :data="humid"/>
                            <v-divider vertical class="mx-2"></v-divider>
                            <OptionsComponent type="humid" :avg-measure="avgHumid" :max-measure="maxHumid" :min-measure="minHumid" @humid="fetchHumid" />
                        </div>
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
import ChartComponent from '@/components/ChartComponent.vue';
import OptionsComponent from '@/components/OptionsComponent.vue';
import axios from 'axios';

export default{
    name: 'RoomsView',
    components:{
        NavPanel,
        FooterBar,
        ChartComponent,
        OptionsComponent
    },
    data: ()=>({
        tab: null,
        sensors:[],
        temp:[],
        humid:[],
        roomName:null,
        avgTemp:null,
        maxTemp:null,
        minTemp:null,
        avgHumid:null,
        maxHumid:null,
        minHumid:null,
        tmpRng:null,
        humRng:null,
    }),
    async created(){
        this.fetchContent(this.$route.params.id)
        this.fetchTemp("today")
        this.fetchHumid("today")
    },
    async updated(){
        this.fetchContent(this.$route.params.id)
        this.fetchTemp(this.tmpRng)
        this.fetchHumid(this.humRng)
    },
    methods:{
        async fetchContent(id){
            let room = null;
            try{
                room = await axios.get(`http://localhost:5000/rooms/${id}`);
                this.roomName = room.data.name;
                this.sensors = room.data.sensors;
            }
            catch(e){
                console.log(e);
            }
        },
        async fetchTemp(range){
            this.tmpRng = range;
            let tempRes = null;
            try{
                switch(range){
                    case "today":
                        tempRes = await axios.get("http://localhost:5000/todayTemperature");
                        break;
                    case "3day":
                        tempRes = await axios.get("http://localhost:5000/threeDayTemperature");
                        break;
                    case "week":
                        tempRes = await axios.get("http://localhost:5000/weekTemperature");
                        break;
                    case "2weeks":
                        tempRes = await axios.get("http://localhost:5000/twoWeekTemperature");
                        break;
                    case "month":
                        tempRes = await axios.get("http://localhost:5000/monthTemperature");
                        break;
                }
                
                this.temp = tempRes.data.temp;
                this.avgTemp = tempRes.data.averageTemp;
                this.maxTemp = tempRes.data.maximumTemp;
                this.minTemp = tempRes.data.minimumTemp;
                this.$emit('change-values');
            }
            catch(e){
                console.log(e);
            }
        },
        async fetchHumid(range){
            this.humRng = range;
            let humidRes = null;
            try{
                switch(range){
                    case "today":
                        humidRes = await axios.get("http://localhost:5000/todayHumidity");
                        break;
                    case "3day":
                        humidRes = await axios.get("http://localhost:5000/threeDayHumidity");
                        break;
                    case "week":
                        humidRes = await axios.get("http://localhost:5000/weekHumidity");
                        break;
                    case "2weeks":
                        humidRes = await axios.get("http://localhost:5000/twoWeekHumidity");
                        break;
                    case "month":
                        humidRes = await axios.get("http://localhost:5000/monthHumidity");
                        break;
                }
                
                this.humid = humidRes.data.hum;
                this.avgHumid = humidRes.data.averageHumid;
                this.maxHumid = humidRes.data.maximumHumid;
                this.minHumid = humidRes.data.minimumHumid;
                this.$emit('change-values');
            }
            catch(e){
                console.log(e);
            }
        }
    },
    emits: ['change-values']
    
}
</script>