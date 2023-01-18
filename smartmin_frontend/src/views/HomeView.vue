<template>
  <NavPanel/>
  <div class="bg-bgLight h-100">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="room in rooms" :key="room.id" :value="room.name">
        <v-expansion-panel-title class="bg-bgLight font-weight-medium">{{ room.name }}</v-expansion-panel-title>
        <v-expansion-panel-text class="bg-secondary">
          <div class=" d-flex justify-space-around align-center">
            <span>
              <span class="text-h6">Temperature:</span>
              <span class="ml-1 font-weight-medium">{{ room.temperature.value }}&#176;C</span>
            </span>
            <span>
              <span class="text-h6">Humidity:</span>
              <span class="ml-1 font-weight-medium">{{ room.humidity.value }}%</span>
            </span>
            <span>
              <span class="text-h6">Accessibility:</span>
              <span class="ml-1 font-weight-medium text-uppercase pa-1 rounded" :class="room.accessibility.value?'bg-switchGreen':'bg-alertRed'">{{ room.accessibility.value?"yes":"no" }}</span>
            </span>
          </div>
          
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    </div>
    <FooterBar/>
</template>

<script>
import { defineComponent } from 'vue';
import NavPanel from '../components/NavPanel'
import FooterBar from '../components/FooterBar'
import axios from 'axios'

export default defineComponent({
  name: 'HomeView',

  components: {
    NavPanel,
    FooterBar,
  },
  data:()=>({
    rooms:null,
    panel:['Office 1', 'Office 2', 'Storage']
  }),
  async created(){
    this.fetchData();
  },
  methods:{
    async fetchData(){
      const roomRes = await axios.get("http://localhost:5000/rooms");
      this.rooms = roomRes.data;
    }
  }
});
</script>
