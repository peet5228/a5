<template>
    <v-app>
        <v-app-bar color="#7d0c14" class="py-2">
            <v-app-bar-nav-icon @click="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
            <v-toolbar-title>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</v-toolbar-title>
            <div>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }} <br> {{ user.role }}</div>&nbsp;&nbsp;&nbsp;&nbsp;
            <v-btn @click="logout" color="white">ออกจากระบบ</v-btn>
        </v-app-bar>
        <v-navigation-drawer color="#4A4A4A" v-model="drawer" app :temporary="isMobile" :permanent="!isMobile">
            <v-list>
                <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { computed,onMounted,ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter()
const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref({})
const roles = [
    //staff
    {title:'หน้าหลัก',to:'Staff',role:'ฝ่ายบุคลากร'},

    //commit
    {title:'หน้าหลัก',to:'Committee',role:'กรรมการประเมิน'},

    //eva
    {title:'หน้าหลัก',to:'Evaluatee',role:'ผู้รับการประเมินผล'},
]
const navitem = computed(() =>
    roles.filter((item) => item.role.includes(user.value.role))
)
const logout = async () =>{
    if(confirm('ต้องการออกจากระบบใช่หรือไม่'))return
    localStorage.removeItem('token')
    router.push({path:'/login'})
}
const token = localStorage.getItem('token')
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/profile`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ',err)
    }
}
onMounted(fetchUser)
</script>

<style scoped>

</style>