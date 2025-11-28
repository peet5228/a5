<template>
    <v-container fluid class="py-10">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">จัดการตัวชี้วัด</h1>&nbsp;
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-select v-model="form.id_topic" :items="topic.map(t => ({title:t.name_topic,value:t.id_topic}))" :error-messages="error.id_topic" label="หัวข้อ" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.name_indicate" :error-messages="error.name_indicate" label="ชื่อตัวชี้วัด" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-textarea rows="3" v-model="form.detail_indicate" :error-messages="error.detail_indicate" label="รายละเอียด" />
                            </v-col>
                             <v-col cols="12" md="6">
                                <v-text-field v-model="form.point_indicate" type="number" :error-messages="error.point_indicate" label="น้ำหนักคะแนน" />
                            </v-col>
                              <v-col cols="12" md="6">
                                <v-select v-model="form.check_indicate" :items="[{title:'มี',value:'y'},{title:'ไม่มี',value:'n'}]" :error-messages="error.check_indicate" label="ลักษณะตัวเลิอกคะแนน" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="text-white w-full">{{ form.id_indicate ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
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
                            <th class="border text-center">ชื่อตัวชี้วัด</th>
                            <th class="border text-center">รายละเอียด</th>
                            <th class="border text-center">น้ำหนักคะแนน</th>
                            <th class="border text-center">ลักษณะตัวเลิอกคะแนน</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_indicate">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.name_topic }}</td>
                            <td class="border text-center">{{ items.name_indicate }}</td>
                            <td class="border text-center">{{ items.detail_indicate }}</td>
                            <td class="border text-center">{{ items.point_indicate }}</td>
                            <td class="border text-center">{{ items.check_indicate === 'y' ? 'มี' : 'ไม่มี' }}</td>
                            <td class="border text-center">
                                <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                <v-btn class="text-white" size="small" color="error" @click="del(items.id_indicate)">ลบ</v-btn>
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
const topic = ref([])

const form = ref({
    id_indicate:null,
    id_topic:'',
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
})

const reset = () => {
    form.value = {
        id_indicate:null,
        id_topic:'',
        name_indicate:'',
        detail_indicate:'',
        point_indicate:'',
        check_indicate:'',
    }
}

const error = ref<Record<string,string>>({})

function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.id_topic)error.value.id_topic='กรุณาเลือกหัวข้อการประเมิน'
    if(!f.name_indicate)error.value.name_indicate='กรุณากรอกชื่อตัวชี้วัด'
    if(!f.detail_indicate)error.value.detail_indicate='กรุณากรอกรายละเอียด'
    if(!f.point_indicate)error.value.point_indicate='กรุณากำหนดน้ำหนักคะแนน'
    if(!f.check_indicate)error.value.check_indicate='กรุณาเลือกลักษณะตัวเลือกคะแนน'
    return Object.keys(error.value).length === 0
}

const fetch = async () => {
    try{
        const t = await axios.get(`${api}/topic`)
        topic.value = t.data
        const res = await axios.get(`${api}/indicate`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    if(!vaildateForm()) return
    try{
        if(form.value.id_indicate){
            await axios.put(`${api}/indicate/${form.value.id_indicate}`,form.value)
        }else{
            await axios.post(`${api}/indicate`,form.value)
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

const del = async (id_indicate:number) => {
    try{
        if(!confirm('ท่านต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/indicate/${id_indicate}`)
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