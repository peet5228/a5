<template>
    <v-container fluid class="py-10">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">สถานะการประเมินของกรรมการประเมิน</h1>&nbsp;
                รายชื่อกรรมการประเมิน

                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">กรรมการประเมิน</th>
                            <th class="border text-center">สถานะการประเมิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_eva">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                            <td class="border text-center">
                                <v-btn :color="bg(items.status_commit)" class="text-white" size="small">
                                    {{ items.status_commit === 'n' ? 'ยังไม่ได้ประเมิน' : 'ประเมินเสร็จสิ้น' }}
                                </v-btn>
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
import { useRoute } from 'vue-router';

const id_eva = useRoute().params.id_eva
const api = import.meta.env?.vite_BASE_API || 'http://localhost:3001/api/Staff'

const result = ref([])

const fetch = async () => {
    try{
        const res = await axios.get(`${api}/status/${id_eva}`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const bg = (status_commit:string) => {
    if(status_commit === 'n') return 'error'
    if(status_commit === 'y') return 'success'
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