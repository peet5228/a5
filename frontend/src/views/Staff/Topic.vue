<template>
    <v-container fluid class="py-10">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">จัดการกรรมหัวข้อการประเมิน</h1>&nbsp;
                        <v-row class="mt-4">
                            <v-col cols="12" md="12">
                                <v-text-field v-model="form.name_topic" :error-messages="error.name_topic" label="ชื่อหัวข้อ"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="text-white w-full">{{ form.id_topic ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="reset" color="error" class="text-white w-full">ยกเลิก</v-btn></v-col>
                        </v-row>
                    </v-card>
                </v-form>

                <br>

                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">หัวข้อ</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_topic">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.name_topic }}</td>
                            <td class="border text-center">
                                <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                <v-btn class="text-white" size="small" color="error" @click="del(items.id_topic)">ลบ</v-btn>
                            </td>
                        </tr>
                        <tr v-if="result.length === 0">
                            <td colspan="7" class="text-center border text-gray-500">ไม่พบข้อมูล</td>
                        </tr>
                    </tbody>
                </v-table>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const api = import.meta.env?.vite_BASE_API || 'http://localhost:3001/api/Staff'

const result = ref([])

const form = ref({
    id_topic:null,
    name_topic:null,
})

const reset = () => {
    form.value = {
        id_topic:null,
        name_topic:null,
    }
}

const error = ref<Record<string,string>>({})

function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.name_topic)error.value.name_topic='กรุณากรอกชื่อหัวข้อการประเมิน'
    return Object.keys(error.value).length === 0
}

const fetch = async () => {
    try{
        const res = await axios.get(`${api}/topic`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    if(!vaildateForm()) return
    try{
        if(form.value.id_topic){
            await axios.put(`${api}/topic/${form.value.id_topic}`,form.value)
        }else{
            await axios.post(`${api}/topic`,form.value)
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('Error',err)
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const del = async (id_topic:number) => {
    try{
        if(!confirm('ท่านต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/topic/${id_topic}`)
        await fetch()
        await reset()
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