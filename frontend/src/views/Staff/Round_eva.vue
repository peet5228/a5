<template>
    <v-container fluid class="py-10">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">จัดการรอบการประเมิน</h1>&nbsp;
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.day_open" type="date" label="วันที่เปิดรอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.day_out" type="date" label="วันที่ปิดรอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-select v-model="form.round_sys" :items="[{title:'รอบที่ 1',value:'1'},{title:'รอบที่ 2',value:'2'}]"  label="รอบการประเมิน" />
                            </v-col>
                             <v-col cols="12" md="6">
                                <v-text-field v-model="form.year_sys" type="number" label="ปี" />
                            </v-col>
                              <v-col cols="12" md="6">
                                <v-select v-model="form.status_sys" :items="[{title:'เปิด',value:'y'},{title:'ปิด',value:'n'}]" label="สถานะ เปิด/แปิด รอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="text-white w-full">{{ form.id_sys ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="reset" color="error" class="text-white w-full">ยกเลิก</v-btn></v-col>
                        </v-row>
                    </v-card>
                </v-form>

                <br>

                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">วันที่เปิดรอบการประเมิน</th>
                            <th class="border text-center">วันที่ปิดรอบการประเมิน</th>
                            <th class="border text-center">รอบการประเมิน</th>
                            <th class="border text-center">สถานะ เปิด/ปิด รอบการประเมิน</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_sys">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.day_open }}</td>
                            <td class="border text-center">{{ items.day_out }}</td>
                            <td class="border text-center">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                            <td class="border text-center">{{ items.status_sys === 'y' ? 'เปิด' : 'ปิด' }}</td>
                            <td class="border text-center">
                                <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                <v-btn class="text-white" size="small" color="error" @click="del(items.id_sys)">ลบ</v-btn>
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
    id_sys:null,
    day_open:'',
    day_out:'',
    round_sys:'',
    year_sys:'',
    status_sys:'',
})

const reset = () => {
    form.value = {
        id_sys:null,
        day_open:'',
        day_out:'',
        round_sys:'',
        year_sys:'',
        status_sys:'',
    }
}



const fetch = async () => {
    try{
        const res = await axios.get(`${api}/round_eva`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        if(form.value.id_sys){
            await axios.put(`${api}/round_eva/${form.value.id_sys}`,form.value)
        }else{
            await axios.post(`${api}/round_eva`,form.value)
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

const del = async (id_sys:number) => {
    try{
        if(!confirm('ท่านต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/round_eva/${id_sys}`)
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