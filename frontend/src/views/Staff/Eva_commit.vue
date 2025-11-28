<template>
    <v-container fluid class="py-10">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">ตั้งค่ากรรมการ</h1>
                        <p class="text-gray-500 font-weight-bold">ข้อมูลผู้ถูกประเมิน</p>
                        <p class="text-gray-500 font-weight-bold">ชื่อ : {{ header.first_name }} {{ header.last_name }}</p>
                        <p class="text-gray-500 font-weight-bold">รอบการประเมิน : รอบที่ {{ header.round_sys }} ปี {{ header.year_sys }}</p>
                        <v-row class="mt-4">
                            <template v-for="(c,index) in List" :key="index">
                                <v-col cols="12" md="6">
                                    <v-select v-model="c.id_member" :label="`กรรมการคนที่ ${index+1}`" :items="MEMBER(index).map(p => ({title:p.fullname_commit,value:p.id_member}))" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="c.role" :label="`ตำแหน่งคนที่ ${index+1}`" :items="ROLE(index)" />
                                </v-col>
                            </template>
                            <v-col cols="12" md="12" class="text-center"><v-btn type="submit" color="blue" class="text-white w-full">บันทึก</v-btn></v-col>
                        </v-row>
                    </v-card>
                </v-form>

                <br>

                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">กรรมการ</th>
                            <th class="border text-center">ตำแหน่ง</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in List" :key="items.id_commit">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ nameOf(items.id_member) }}</td>
                            <td class="border text-center">{{ items.role }}</td>
                            <td class="border text-center">
                                <!-- <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                <v-btn class="text-white" size="small" color="error" @click="del(items.id_commit)">ลบ</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted,computed } from 'vue';
import { useRoute } from 'vue-router';

const id_eva = useRoute().params.id_eva
const api = import.meta.env?.vite_BASE_API || 'http://localhost:3001/api/Staff'

const people = ref([])
const header = ref([])
const role = ['ประธาน','กรรมการ','เลขา']
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
])

const MEMBER = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.id_member : null) )
    return people.value.filter((p) => !picked.includes(p.id_member))
}

const ROLE = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.role : null) )
    return role.filter((p) => !picked.includes(p))
}

const nameMap = computed( () => Object.fromEntries(people.value.map( (p) => [p.id_member , p.fullname_commit])) )
const nameOf = (id:number) => nameMap.value[id]

const fetch = async () => {
    try{
        const r = await axios.get(`${api}/commit/header/${id_eva}`)
        header.value = r.data[0]
        const res = await axios.get(`${api}/commit/${id_eva}`)
        people.value = res.data.before
        const  useData = res.data.after
        console.log(res.data.before)
        if(useData.length === 0){
            List.value = [
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''},
            ]
        }else{
            List.value = useData.map(c => ({
                id_commit:c.id_commit,id_member:c.id_member,role:c.role
            }))
            while(List.value.length < 3){
                List.value.push({id_commit:null,id_member:'',role:''})
            }
        }
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        await axios.post(`${api}/commit/${id_eva}`,List.value)
        alert('ทำรายการสำเร็จ')
        await fetch()
    }catch(err){
        console.error('Error',err)
    }
}

const del = async (id_commit:number) => {
    try{
        if(!confirm('ท่านต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/commit/${id_commit}`)
        await fetch()
    }catch(err){
        console.error("Error Delete",err)
    }
}

onMounted(fetch)
</script>

<style scoped>
.btn-maroon{
    background-color: #7c0d14;
}
.text-maroon{
    color: #7c0d14;
}
</style>