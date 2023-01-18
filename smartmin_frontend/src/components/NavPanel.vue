<template>
  <v-navigation-drawer v-model="drawer" color="#014171">
    <v-list v-model:opened="open" nav>
        <v-chip @click="drawer = !drawer" class="ml-2 mb-4 d-lg-none b-0" color="#bbb" >&lt; Close</v-chip>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/" class="text-white"></v-list-item>
        <v-list-item prepend-icon="mdi-login" v-show="!admin" title="Log In" value="login" to="/login" class="text-white"></v-list-item>
        <v-list-item v-show="admin" prepend-icon="mdi-alert-circle" title="Alerts" value="alerts" to="/alerts" class="text-white"></v-list-item>
        <v-list-group v-show="admin" value="Rooms">
            <template v-slot:activator="{props}">
                <v-list-item v-bind="props" prepend-icon="mdi-office-building" title="Rooms" class="text-white"></v-list-item>
            </template>
            <v-list-item v-for="(room,i) in rooms" :key="i" :title="room.title" :value="room" :to="`/rooms/${room.id}`" :prepend-icon="room.icon" class="text-white"></v-list-item>
        </v-list-group>
        <v-list-item v-show="admin" prepend-icon="mdi-logout" title="Log Out" value="logout" to="/logout" class="text-white" @click="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="#bbb">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-img src="../assets/logo2.png" class=""></v-img>
  </v-app-bar>
</template>
  
  <script>
    import axios from 'axios';
    export default {
      data: () => ({
        drawer: false,
        admin: null,
        open:[],
        rooms:[
            {icon:'mdi-desk', title:'Office 1', id:"63c04af69e05d8e5a0fa0a23"},
            {icon:'mdi-desk', title:'Office 2', id:"63c04afa9e05d8e5a0fa0a25"},
            {icon:'mdi-cube-outline', title:'Storage', id:"63c04b089e05d8e5a0fa0a27"},


        ]
      }),
      created(){
        if(localStorage.getItem('jwt')==null) this.admin = false;
        else this.admin = true;
      },
      methods:{
        async logout(){
          try{
            const logout = await axios.get('http://localhost:3000/logout',{withCredentials:true});
            console.log(logout.data);
          }
          catch(e){
            console.log(e);
          }
          
        }
      }
    }
  </script>