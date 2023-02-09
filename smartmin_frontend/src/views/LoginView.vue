<template>
    <NavPanel/>
    <v-sheet class="bg-primary pa-12 h-100" rounded>
        <div v-show="fail"><v-alert type="error" class="mb-2 w-25 mx-auto d-none d-lg-flex">{{ alert }}</v-alert></div>
        <v-card class="ma-auto w-25 pa-5 d-none d-lg-block" elevation="12" rounded>
            <v-img src="../assets/logo2.png" max-width="200px" class="mx-auto pa-2"></v-img>
            <v-form v-model="form" @submit.prevent="onSubmit">

                <v-text-field clearable v-model="username" :rules="[required]" density="comfortable" :readonly="loading" prepend-inner-icon="mdi-account" class="text-secondary mb-2 w-100 mx-auto d-none d-lg-block" label="Username" type="text" variant="outlined"></v-text-field>
                <div class="d-flex justify-space-between">
                    <v-text-field clearable v-model="password" :rules="[required,passwordCheck]" density="comfortable" :readonly="loading" prepend-inner-icon="mdi-lock" :type="sh?'text':'password'" class="text-secondary mb-2 w-75 mx-auto d-none d-lg-block" label="Password" variant="outlined" rounded></v-text-field>
                    <v-btn :icon="sh?'mdi-eye-off':'mdi-eye'" @click="()=>(sh=!sh)" class="d-inline text-secondary ml-2" variant="text"></v-btn>
                </div>
                
                <v-divider class="w-50 mx-auto mb-4" color="primary"></v-divider>
                <div style="margin:auto;width:7em;">
                    <v-btn :loading="loading" block color="primary" rounded="pill" class="mb-2 w-25" type="submit">Sign In</v-btn>
                </div>
                
            </v-form>
        </v-card>
        <div v-show="fail"><v-alert type="error" :show="fail" class="mb-2 w-50 mx-auto d-none d-md-flex d-lg-none">{{ alert }}</v-alert></div>
        <v-card class="ma-auto w-50 pa-5 d-none d-md-block d-lg-none" elevation="12" rounded>
            <v-img src="../assets/logo2.png" max-width="200px" class="mx-auto pa-2"></v-img>
            <v-form v-model="form" @submit.prevent="onSubmit">

                <v-text-field clearable v-model="username" :rules="[required]" density="comfortable" :readonly="loading" prepend-inner-icon="mdi-account" class="text-secondary mb-2 w-100 mx-auto d-none d-md-block" label="Username" type="text" variant="outlined"></v-text-field>
                <div class="d-flex justify-space-between">
                    <v-text-field clearable v-model="password" :rules="[required,passwordCheck]" density="comfortable" :readonly="loading" prepend-inner-icon="mdi-lock" :type="sh?'text':'password'" class="text-secondary mb-2 w-75 mx-auto d-none d-md-block" label="Password" variant="outlined" rounded></v-text-field>
                    <v-btn :icon="sh?'mdi-eye-off':'mdi-eye'" @click="()=>(sh=!sh)" class="d-inline text-secondary ml-2" variant="text"></v-btn>
                </div>
                <v-divider class="w-50 mx-auto mb-4" color="primary"></v-divider>
                <div style="margin:auto;width:7em;">
                    <v-btn :loading="loading" block color="primary" rounded="pill" class="mb-2 w-25" type="submit">Sign In</v-btn>
                </div>
                
            </v-form>
        </v-card>
        <div v-show="fail"><v-alert type="error" :show="fail" class="mb-2 w-100 d-md-none mx-auto">{{ alert }}</v-alert></div>
        <v-card class="ma-auto w-100 pa-5 d-md-none" elevation="12" rounded>
            <v-img src="../assets/logo2.png" max-width="200px" class="mx-auto pa-2"></v-img>
            <v-form v-model="form" @submit.prevent="onSubmit">

               
                <v-text-field clearable v-model="username" :rules="[required]" density="comfortable" :readonly="loading" prepend-inner-icon="mdi-account" class="text-secondary mb-2 mx-2 d-md-none " label="Username" type="text" variant="outlined"></v-text-field>
                <div class="d-flex justify-space-between">
                    <v-text-field clearable v-model="password" :rules="[required,passwordCheck]" density="comfortable" :readonly="loading" prepend-inner-icon="mdi-lock" :type="sh?'text':'password'" class="text-secondary mb-2 w-75 mx-auto d-md-none" label="Password" variant="outlined" rounded></v-text-field>
                    <v-btn :icon="sh?'mdi-eye-off':'mdi-eye'" @click="()=>(sh=!sh)" class="d-inline text-secondary ml-2" variant="text"></v-btn>
                </div>
                <v-divider class="w-50 mx-auto mb-4" color="primary"></v-divider>
                <div style="margin:auto;width:7em;">
                    <v-btn :loading="loading" block color="primary" rounded="pill" class="mb-2 w-25" type="submit">Sign In</v-btn>
                </div>
                
            </v-form>
        </v-card>
    </v-sheet>
    <FooterBar/>
</template>

<script>
import NavPanel from '@/components/NavPanel';
import FooterBar from '@/components/FooterBar';
import axios from 'axios';

export default {
    name: 'LoginView',
    components:{
        NavPanel,
        FooterBar
    },
    data: ()=>({
        form:false,
        username:null,
        password:null,
        loading:false,
        sh:false,
        fail: false,
        alert:"Authentication Failed. Please try again."
    }),

    methods: {
        async onSubmit(){
            if(!this.form) return;
            this.loading = true;
            try{
                const users = await axios.post(`http://localhost:3000/auth`,{user:this.username, pwd:this.password},{withCredentials:true});
                localStorage.setItem('jwt',users.data.accessToken);
                this.$emit('loggedIn');
                this.$router.push('/');
                this.fail = false;
                this.loading = false;
            }
            catch(e){
                console.log(e);
                this.username="";
                this.password="";
                this.fail = true;
                this.loading = false;
            }
            
            
            
        },
        required(v){
            return !!v || 'Field is required'
        },
        passwordCheck(v){
           const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/;
           return pattern.test(v)||"8 to 16 characters, at least 1 capital letter, 1 number and 1 special character";
        }
    }
}
</script>
