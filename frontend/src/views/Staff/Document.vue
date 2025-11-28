<template>
    <v-container fluid class="py-10">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">แนบเอกสารหรือคู่มือการประเมิน</h1>&nbsp;
                        <v-row class="mt-4">
                            <v-col cols="12" md="12">
                                <v-text-field v-model="name_doc" label="ชื่อเอกสาร"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-file-input v-model="file" label="ไฟล์" accept=".doc,.docx,image/*" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="text-white w-full">บันทึก</v-btn></v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="reset" color="error" class="text-white w-full">ยกเลิก</v-btn></v-col>
                        </v-row>
                    </v-card>
                </v-form>

                <br>

                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">ชื่อเอกสาร</th>
                            <th class="border text-center">วันที่เพิ่มเอกสาร</th>
                            <th class="border text-center">ไฟล์</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_doc">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.name_doc }}</td>
                            <td class="border text-center">{{ items.day_doc }}</td>
                            <td class="border text-center">
                                <v-btn class="text-white" color="warning" size="small" @click="view(items.file)">เปิดดู</v-btn>
                            </td>
                            <td class="border text-center">
                                <!-- <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                <v-btn class="text-white" size="small" color="error" @click="del(items.id_doc)">ลบ</v-btn>
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
const name_doc = ref('')
const file = ref<File | null>(null)

const error = ref<Record<string,string>>({})

const fetch = async () => {
    try{
        const res = await axios.get(`${api}/document`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    if(!name_doc.value || !file.value) return alert('กรุณากรอกชื่อเอกสารและแนบไฟล์ทุกครั้ง')
    try{
        const formData = new FormData()
        formData.append('file',file.value)
        formData.append('name_doc',name_doc.value)
        await axios.post(`${api}/document`,formData)
        alert('ทำรายการสำเร็จ')
        await fetch()
    }catch(err){
        console.error('Error',err)
    }
}

const del = async (id_doc:number) => {
    try{
        if(!confirm('ท่านต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/document/${id_doc}`)
        await fetch()
    }catch(err){
        console.error("Error Delete",err)
    }
}

const view = (filename:string) => {
    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
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