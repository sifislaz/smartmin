<template>
    <v-card>
      <v-navigation-drawer v-model="drawer" color="#014171">
        <v-list v-model:opened="open" nav>
            <v-chip @click="drawer = !drawer" class="ml-2 d-lg-none" color="#bbb" >&lt; Close</v-chip>
            <v-list-item prepend-icon="mdi-home" title="Home" value="home" class="text-white"></v-list-item>
            <v-list-group value="Rooms">
                <template v-slot:activator="{props}">
                    <v-list-item v-bind="props" prepend-icon="mdi-office-building" title="Rooms" class="text-white"></v-list-item>
                </template>
                <v-list-item v-for="([icon,room],i) in rooms" :key="i" :title="room" :value="room" :prepend-icon="icon" class="text-white"></v-list-item>
            </v-list-group>
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
        drawer: null,
        open:[],
        // rooms:['Office 1', 'Office 2', 'Office 3', 'Office 4', 'WC', 'Reception', 'Storage', 'Conference Room', 'Break Room']
        rooms:[
            ['mdi-desk', 'Office 1'],
            ['mdi-desk', 'Office 2'],
            ['mdi-desk', 'Office 3'],
            ['mdi-desk', 'Office 4'],
            ['mdi-toilet', 'WC'],
            ['mdi-office-building-marker', 'Reception'],
            ['mdi-cube-outline', 'Storage'],
            ['mdi-account-group', 'Conference Room'],
            ['mdi-coffee', 'Break Room'],

        ]
 }),
    }
  </script>