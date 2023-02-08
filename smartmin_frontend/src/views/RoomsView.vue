<template>
    <NavPanel/>
    <v-sheet color="bgLight" class="w-100 h-100">
        <h1 class="text-primary text-center">{{ roomName }}</h1>
        <v-card class="bg-bgDark rounded-shaped">
            <v-tabs v-model="tab" bg-color="secondary">
                <v-tab value="devices" @click="fetchContent">Devices</v-tab>
                <v-tab value="temp">Temperature Graph</v-tab>
                <v-tab value="humid">Humidity Graph</v-tab>
            </v-tabs>
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="devices">
                        <h2 class="text-secondary text-center">Devices</h2>
                        <div v-show="fail"><v-alert type="error" class="w-25 mx-auto my-2">Couldn't change the device's state</v-alert></div>
                        <div v-for="sensor of sensors" :key="sensor.sensId" class="bg-primary rounded-lg pa-4 my-2 d-flex justify-space-between align-center w-25 mx-auto">
                            <span class="text-white text-h5">{{sensor.sensType}}</span>
                            <div><v-switch v-model="switches" :value="sensor.sensId" color="switchGreen" inset hide-details @change="updateSensor(sensor.sensId)"></v-switch></div>
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
        switches:[],
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
        fail:false,
        roomId:null
    }),
    async created(){
        this.roomId = this.$route.params.id
        this.fetchContent()
        this.fetchTemp("today")
        this.fetchHumid("today")
    },
    async updated(){
        this.roomId = this.$route.params.id
        this.fetchContent()
        this.fetchTemp(this.tmpRng)
        this.fetchHumid(this.humRng)
    },
    methods:{
        async fetchContent(){
            let room = null;
            this.switches = [];
            this.fail = false;
            try{
                room = await axios.get(`http://localhost:3000/data/room/${this.roomId}`, {headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                this.roomName = room.data.name;
                this.sensors = room.data.sensors;
                for(let sensor of this.sensors){
                    if(sensor.sensValue){
                        this.switches.push(sensor.sensId);
                    }
                }
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
                        tempRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/temp?timeNumber=1&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "3day":
                        tempRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/temp?timeNumber=3&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "week":
                        tempRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/temp?timeNumber=7&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "2weeks":
                        tempRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/temp?timeNumber=14&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "month":
                        tempRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/temp?timeNumber=30&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
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
                        humidRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/hum?timeNumber=1&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "3day":
                        humidRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/hum?timeNumber=1&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "week":
                        humidRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/hum?timeNumber=1&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "2weeks":
                        humidRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/hum?timeNumber=1&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                    case "month":
                        humidRes = await axios.get(`http://localhost:3000/data/room/${this.roomId}/hum?timeNumber=1&timeScale=days`,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                        break;
                }
                this.humid = humidRes.data.hum;
                this.avgHumid = humidRes.data.averageHum;
                this.maxHumid = humidRes.data.maximumHum;
                this.minHumid = humidRes.data.minimumHum;
                this.$emit('change-values');
            }
            catch(e){
                console.log(e);
            }
        },
        async updateSensor(sensorId){

            let sensorValue = false;
            if(this.switches.includes(sensorId)){
                sensorValue = true;
            }
            else{
                sensorValue = false
            }
            const res = {sensId:sensorId, newDeviceValue:sensorValue, roomId:this.roomId}
            try{
                await axios.post(`http://localhost:3000/device/state`,res,{headers:{'authorization':localStorage.getItem('jwt')},withCredentials:true});
                this.fail = false;
            }
            catch(e){
                if(sensorValue){
                    this.switches = this.switches.filter((value)=>{
                        if(value!==sensorId) return value
                    })
                }
                else{
                    this.switches.push(sensorId);
                }
                this.fail = true;
                console.log(e);
            }
            
        }
    },
    emits: ['change-values']
    
}
</script>