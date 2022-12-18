<template>
    <NavPanel/>
    <v-sheet color="bgLight" class="w-100 h-100">
        <h1 class="text-primary text-center" :class="$route.params.room==='wc'?'text-uppercase':'text-capitalize'">{{$route.params.room!=='conf'?$route.params.room!=='break'?$route.params.room:'Break Room':'Conference Room'}} {{$route.params.id}}</h1>
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
                        <h2 class="text-secondary text-center">Temperature</h2>
                        <div class="d-flex flex-column flex-md-row justify-center align-center">
                            <ChartComponent v-if="tempRange==='today'" dataName="Temperature" :data="tempToday"/>
                            <ChartComponent v-if="tempRange==='3day'" dataName="Temperature" :data="temp3Days"/>
                            <ChartComponent v-if="tempRange==='week'" dataName="Temperature" :data="tempWeek"/>
                            <ChartComponent v-if="tempRange==='2weeks'" dataName="Temperature" :data="temp2Week"/>
                            <ChartComponent v-if="tempRange==='month'" dataName="Temperature" :data="tempMonth"/>
                            <v-divider vertical v-show="tempRange"></v-divider>
                            <div class="ml-4">
                                <h3 class="text-secondary text-center">Options</h3>
                                <v-radio-group v-model="tempRange">
                                    <v-radio label="Today" value="today"></v-radio>
                                    <v-radio label="Last 3 days" value="3day"></v-radio>
                                    <v-radio label="Last Week" value="week"></v-radio>
                                    <v-radio label="Last 2 Weeks" value="2weeks"></v-radio>
                                    <v-radio label="Last 30 Days" value="month"></v-radio>
                                </v-radio-group>
                                <v-divider></v-divider>
                                <div class="mx-auto">
                                    <h3 class="text-secondary text-center">Statistics</h3>
                                    <div v-show="tempRange==='today'">
                                        <span class="d-block my-2 text-h6">Average Temperature: {{avgDayTemp}}&#176;C</span>
                                        <span class="d-block my-2 text-h6">Maximum Temperature: {{maxDayTemp}}&#176;C</span> 
                                        <span class="d-block my-2 text-h6">Minimum Temperature: {{minDayTemp}}&#176;C</span> 
                                    </div>
                                    <div v-show="tempRange==='3day'">
                                        <span class="d-block my-2 text-h6">Average Temperature: {{avg3DayTemp}}&#176;C</span>
                                        <span class="d-block my-2 text-h6">Maximum Temperature: {{max3DayTemp}}&#176;C</span> 
                                        <span class="d-block my-2 text-h6">Minimum Temperature: {{min3DayTemp}}&#176;C</span> 
                                    </div>
                                    <div v-show="tempRange==='week'">
                                        <span class="d-block my-2 text-h6">Average Temperature: {{avgWeekTemp}}&#176;C</span>
                                        <span class="d-block my-2 text-h6">Maximum Temperature: {{maxWeekTemp}}&#176;C</span> 
                                        <span class="d-block my-2 text-h6">Minimum Temperature: {{minWeekTemp}}&#176;C</span> 
                                    </div>
                                    <div v-show="tempRange==='2weeks'">
                                        <span class="d-block my-2 text-h6">Average Temperature: {{avg2WeekTemp}}&#176;C</span>
                                        <span class="d-block my-2 text-h6">Maximum Temperature: {{max2WeekTemp}}&#176;C</span> 
                                        <span class="d-block my-2 text-h6">Minimum Temperature: {{min2WeekTemp}}&#176;C</span> 
                                    </div>
                                    <div v-show="tempRange==='month'">
                                        <span class="d-block my-2 text-h6">Average Temperature: {{avgMonthTemp}}&#176;C</span>
                                        <span class="d-block my-2 text-h6">Maximum Temperature: {{maxMonthTemp}}&#176;C</span> 
                                        <span class="d-block my-2 text-h6">Minimum Temperature: {{minMonthTemp}}&#176;C</span> 
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </v-window-item>
                    <v-window-item value="humid">
                        <h2 class="text-secondary text-center">Humidity</h2>
                        <div class="d-flex flex-column flex-md-row justify-center">
                            <ChartComponent v-if="humidRange==='today'" dataName="Humidity" :data="humidToday"/>
                            <ChartComponent v-if="humidRange==='3day'" dataName="Humidity" :data="humid3Days"/>
                            <ChartComponent v-if="humidRange==='week'" dataName="Humidity" :data="humidWeek"/>
                            <ChartComponent v-if="humidRange==='2weeks'" dataName="Humidity" :data="humid2Week"/>
                            <ChartComponent v-if="humidRange==='month'" dataName="Humidity" :data="humidMonth"/>
                            <v-divider vertical v-show="humidRange"></v-divider>
                            <div class="ml-4">
                                <h3 class="text-secondary text-center">Options</h3>
                                <v-radio-group v-model="humidRange">
                                    <v-radio label="Today" value="today"></v-radio>
                                    <v-radio label="Last 3 days" value="3day"></v-radio>
                                    <v-radio label="Last Week" value="week"></v-radio>
                                    <v-radio label="Last 2 Weeks" value="2weeks"></v-radio>
                                    <v-radio label="Last 30 Days" value="month"></v-radio>
                                </v-radio-group>
                                <v-divider></v-divider>
                                <div class="mx-auto">
                                    <h3 class="text-secondary text-center">Statistics</h3>
                                    <div v-show="humidRange==='today'">
                                        <span class="d-block my-2 text-h6">Average Humidity: {{avgDayHumid}}%</span>
                                        <span class="d-block my-2 text-h6">Maximum Humidity: {{maxDayHumid}}%</span> 
                                        <span class="d-block my-2 text-h6">Minimum Humidity: {{minDayHumid}}%</span> 
                                    </div>
                                    <div v-show="humidRange==='3day'">
                                        <span class="d-block my-2 text-h6">Average Humidity: {{avg3DayHumid}}%</span>
                                        <span class="d-block my-2 text-h6">Maximum Humidity: {{max3DayHumid}}%</span> 
                                        <span class="d-block my-2 text-h6">Minimum Humidity: {{min3DayHumid}}%</span> 
                                    </div>
                                    <div v-show="humidRange==='week'">
                                        <span class="d-block my-2 text-h6">Average Humidity: {{avgWeekHumid}}%</span>
                                        <span class="d-block my-2 text-h6">Maximum Humidity: {{maxWeekHumid}}%</span> 
                                        <span class="d-block my-2 text-h6">Minimum Humidity: {{minWeekHumid}}%</span> 
                                    </div>
                                    <div v-show="humidRange==='2weeks'">
                                        <span class="d-block my-2 text-h6">Average Humidity: {{avg2WeekHumid}}%</span>
                                        <span class="d-block my-2 text-h6">Maximum Humidity: {{max2WeekHumid}}%</span> 
                                        <span class="d-block my-2 text-h6">Minimum Humidity: {{min2WeekHumid}}%</span> 
                                    </div>
                                    <div v-show="humidRange==='month'">
                                        <span class="d-block my-2 text-h6">Average Humidity: {{avgMonthHumid}}%</span>
                                        <span class="d-block my-2 text-h6">Maximum Humidity: {{maxMonthHumid}}%</span> 
                                        <span class="d-block my-2 text-h6">Minimum Humidity: {{minMonthHumid}}%</span> 
                                    </div>
                                    
                                    
                                    
                                </div>
                            </div>
                            
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
import axios from 'axios';

export default{
    name: 'RoomsView',
    components:{
        NavPanel,
        FooterBar,
        ChartComponent
    },
    data: ()=>({
        tab: null,
        sensors:[
            {name:"Lights", switch:false, settings:'lights'},
            {name:"Smart Lock", switch:true, settings:'lock'},
            {name:"Alarm", switch:true, settings:'alarm'}
        ],
        temp:[],
        humid:[],
        avgTemp:null,
        maxTemp:null,
        minTemp:null,
        avgHumid:null,
        maxHumid:null,
        minHumid:null
    }),
    async created(){
        try{
            const tempRes = await axios.get("http://localhost:5000/todayTemperature");
            this.temp = tempRes.data.temp;
            this.avgTemp = tempRes.data.averageTemp;
            this.maxTemp = tempRes.data.maximumTemp;
            this.minTemp = tempRes.data.minumumTemp;
            console.log(tempRes);
            const humidRes = await axios.get("http://localhost:5000/todayHumidity");
            this.humid = humidRes.data.hum;
            this.avgHumid = humidRes.data.averageHumid;
            this.maxHumid = humidRes.data.maximumHumid;
            this.minHumid = humidRes.data.minumumHumid;
            console.log(humidRes);
        }
        catch(e){
            console.log(e);
        }
    }
}
</script>