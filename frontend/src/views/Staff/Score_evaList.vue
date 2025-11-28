<template>
    <v-container fluid class="py-10">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">รายงานผลการประเมินของผู้รับการประเมิน</h1>&nbsp;
                รายชื่อผู้รับการประเมิน

                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">ผู้รับการประเมิน</th>
                            <th class="border text-center">รอบการประเมิน</th>
                            <th class="border text-center">วันที่ออกแบบประเมิน</th>
                            <th class="border text-center">สถานะการประเมิน</th>
                            <th class="border text-center">รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_eva">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                            <td class="border text-center">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                            <td class="border text-center">{{ items.day_eva }}</td>
                            <td class="border text-center">
                                <v-btn :color="bg(items.status_eva)" class="text-white" size="small">
                                    {{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมกาประเมิน' : 'ประเมินเสร็จสิ้น' }}
                                </v-btn>
                            </td>
                            <td class="border text-center">
                                <!-- <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                <v-btn class="text-white" size="small" color="success" @click="add(items.id_eva)">รายละเอียด</v-btn>
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

const fetch = async () => {
    try{
        const res = await axios.get(`${api}/list`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const add = (id_eva:number) => {
    router.push({path : `ScoreEva/${id_eva}`})
}

const bg = (status_eva:string) => {
    if(status_eva === 1) return 'blue'
    if(status_eva === 2) return 'warning'
    if(status_eva === 3) return 'success'
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