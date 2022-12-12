<template>
    <div><apexchart width="140%" type="line" :options="chartOptions" :series="series"></apexchart></div>
</template>

<script>
let pr = null;
export default{
    props: ['dataName', 'data'],
    setup(props){
        pr = props
    },
    name: 'ChartComponent',
    data: ()=>({
        chartOptions: {
            chart:{ id: 'vue-example'},
            xaxis:{
                type: 'datetime',
                
            },
            
            stroke:{
                curve: 'smooth'
            },
            markers:{
                size:4
            },
            grid:{
                strokeDashArray:5,
                xaxis:{
                    lines:{
                        show:true
                    }
                }
            }
        },
        series: [{
            name: pr.dataName,
            data:pr.data
        }]
    }),
    
}
</script>

