<template>
    <v-card>
      <v-navigation-drawer v-model="drawer" color="#014171">
        <v-list v-model:opened="open" nav>
            <v-chip @click="drawer = !drawer" class="ml-2 mb-4 d-lg-none b-0" color="#bbb" >&lt; Close</v-chip>
            <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/" class="text-white"></v-list-item>
            <v-list-item v-show="admin" prepend-icon="mdi-alert-circle" title="Alerts" value="alerts" to="/admin/alerts" class="text-white"></v-list-item>
            <v-list-group value="Rooms">
                <template v-slot:activator="{props}">
                    <v-list-item v-bind="props" prepend-icon="mdi-office-building" title="Rooms" class="text-white"></v-list-item>
                </template>
                <v-list-item v-for="(room,i) in rooms" :key="i" :title="room.title" :value="room" :to="room.path" :prepend-icon="room.icon" class="text-white"></v-list-item>
            </v-list-group>
            <v-list-item v-show="admin" prepend-icon="mdi-logout" title="Log Out" value="logout" to="/logout" class="text-white"></v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar color="#bbb">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-img src="../assets/logo2.png" class=""></v-img>
      </v-app-bar>
  
      <!-- <v-main> -->
        <!--  -->
      <!-- </v-main> -->
    </v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        drawer: false,
        admin: false,
        open:[],
        // rooms:['Office 1', 'Office 2', 'Office 3', 'Office 4', 'WC', 'Reception', 'Storage', 'Conference Room', 'Break Room']
        rooms:[
            {icon:'mdi-desk', title:'Office 1', path:'/rooms/office/1'},
            {icon:'mdi-desk', title:'Office 2', path:'/rooms/office/2'},
            {icon:'mdi-desk', title:'Office 3', path:'/rooms/office/3'},
            {icon:'mdi-desk', title:'Office 4', path:'/rooms/office/4'},
            {icon:'mdi-toilet', title:'WC', path:'/rooms/wc'},
            {icon:'mdi-office-building-marker', title:'Reception', path:'/rooms/reception'},
            {icon:'mdi-cube-outline', title:'Storage', path:'/rooms/storage'},
            {icon:'mdi-account-group', title: 'Conference Room', path:'/rooms/conf'},
            {icon:'mdi-coffee', title:'Break Room', path:'/rooms/break'},

        ]
 }),
    }
  </script>