<template>
    <div class="ml-4">
        <h3 class="text-secondary text-center">Options</h3>
        <v-radio-group v-model="range" @update:model-value="changeOption(`${measure}`,`${range}`)">
            <v-radio label="Today" value="today"></v-radio>
            <v-radio label="Last 3 days" value="3day"></v-radio>
            <v-radio label="Last Week" value="week"></v-radio>
            <v-radio label="Last 2 Weeks" value="2weeks"></v-radio>
            <v-radio label="Last 30 Days" value="month"></v-radio>
        </v-radio-group>
        <v-divider></v-divider>
        <div class="mx-auto">
            <h3 class="text-secondary text-center">Statistics</h3>
            <div v-show="measure==='temp'">
                <span class="d-block my-2 text-h6">Average Temperature: {{averMeasure}}&#176;C</span>
                <span class="d-block my-2 text-h6">Maximum Temperature: {{maximumMeasure}}&#176;C</span> 
                <span class="d-block my-2 text-h6">Minimum Temperature: {{minimumMeasure}}&#176;C</span> 
            </div>
            <div v-show="measure==='humid'">
                <span class="d-block my-2 text-h6">Average Humidity: {{averMeasure}}%</span>
                <span class="d-block my-2 text-h6">Maximum Humidity: {{maximumMeasure}}%</span> 
                <span class="d-block my-2 text-h6">Minimum Humidity: {{minimumMeasure}}%</span> 
            </div>
        </div>
    </div>
</template>

<script>
let pr = null;
export default{
    props: ['type', 'avgMeasure', 'maxMeasure', 'minMeasure'],
    setup(props){
        pr = props;
    },
    name: 'OptionsComponent',
    data: ()=>({
        measure:pr.type,
        averMeasure:pr.avgMeasure,
        maximumMeasure:pr.maxMeasure,
        minimumMeasure:pr.minMeasure,
        range:"today"
    }),
    methods:{
        changeOption(measure,range){
            this.$emit(`${measure}`,range);
        }
    },
    watch:{
        type:function(newMeasure){
            this.measure = newMeasure;
        },
        avgMeasure:function(newAvg){
            this.averMeasure = newAvg;
        },
        maxMeasure:function(newMax){
            this.maximumMeasure = newMax;
        },
        minMeasure:function(newMin){
            this.minimumMeasure = newMin;
        },
    },
    emits: ['temp','humid']

}
</script>