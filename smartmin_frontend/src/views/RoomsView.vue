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
                            <v-divider vertical v-show="tempRange"></v-divider>
                            <div class="ml-4">
                                <h3 class="text-secondary text-center">Options</h3>
                                <v-radio-group v-model="tempRange">
                                    <v-radio label="Today" value="today"></v-radio>
                                    <v-radio label="Last 3 days" value="3day"></v-radio>
                                    <v-radio label="Last Week" value="week"></v-radio>
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
                            <v-divider vertical v-show="humidRange"></v-divider>
                            <div class="ml-4">
                                <h3 class="text-secondary text-center">Options</h3>
                                <v-radio-group v-model="humidRange">
                                    <v-radio label="Today" value="today"></v-radio>
                                    <v-radio label="Last 3 days" value="3day"></v-radio>
                                    <v-radio label="Last Week" value="week"></v-radio>
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

let todayTemp = [[1673493345000, 25], [1673496945000, 27] , [1673500545000, 26], [1673504145000, 29]];
let day3Temp = [[1673493345000, 25], [1673496945000, 27] , [1673500545000, 26], [1673504145000, 29],[1673579745000, 25], [1673583345000, 27] , [1673586945000, 26], [1673590545000, 29]];
let weekTemp = [[1673493345000, 25], [1673496945000, 27] , [1673500545000, 26], [1673504145000, 29],[1673666145000, 25], [1673756145000, 27] , [1673846145000, 26], [1673936145000, 29]];
let todayHumid = [[1673493345000, 65], [1673496945000, 67] , [1673500545000, 66], [1673504145000, 69]];
let day3Humid = [[1673493345000, 65], [1673496945000, 67] , [1673500545000, 66], [1673504145000, 69],[1673579745000, 55], [1673583345000, 67] , [1673586945000, 66], [1673590545000, 78]];
let weekHumid = [[1673493345000, 65], [1673496945000, 67] , [1673500545000, 66], [1673504145000, 69],[1673666145000, 55], [1673756145000, 67] , [1673846145000, 66], [1673936145000, 78]];

function avgMeasure(measure){
    let sm = 0;
    let cnt = 0;

    for(let temp of measure){
        sm += temp[1];
        cnt++;
    }
    return sm/cnt;
}

function maxMeasure(measure){
    let fin = [];
    for(let temp of measure){
        fin.push(temp[1]);
    }
    return Math.max(...fin);
}
function minMeasure(measure){
    let fin = [];
    for(let temp of measure){
        fin.push(temp[1]);
    }
    return Math.min(...fin);
}

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
        tempRange: 'today',
        humidRange: 'today',
        tempToday: todayTemp,
        temp3Days: day3Temp,
        tempWeek: weekTemp,
        avgDayTemp: avgMeasure(todayTemp),
        maxDayTemp: maxMeasure(todayTemp),
        minDayTemp: minMeasure(todayTemp),
        avg3DayTemp: avgMeasure(day3Temp),
        max3DayTemp: maxMeasure(day3Temp),
        min3DayTemp: minMeasure(day3Temp),
        avgWeekTemp: avgMeasure(weekTemp),
        maxWeekTemp: maxMeasure(weekTemp),
        minWeekTemp: minMeasure(weekTemp),
        humidToday: todayHumid,
        humid3Days: day3Humid,
        humidWeek: weekHumid,
        avgDayHumid: avgMeasure(todayHumid),
        maxDayHumid: maxMeasure(todayHumid),
        minDayHumid: minMeasure(todayHumid),
        avg3DayHumid: avgMeasure(day3Humid),
        max3DayHumid: maxMeasure(day3Humid),
        min3DayHumid: minMeasure(day3Humid),
        avgWeekHumid: avgMeasure(weekHumid),
        maxWeekHumid: maxMeasure(weekHumid),
        minWeekHumid: minMeasure(weekHumid),
        
    }),
    
}
</script>