<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 1" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-2">
                        <p>ชื่อ : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>

                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-row v-for="(indicate,index2) in topic.indicates" :key="indicate.id_indicate">
                                <v-col cols="12">
                                    <v-card class="pa-2">
                                        <p>
                                            {{ index1+1 }}.{{ index2+1 }} {{ indicate.name_indicate }} น้ำหนักคะแนน {{ indicate.point_indicate }} คะแนนเต็ม {{ indicate.point_indicate*4 }} รายละเอียดตัวชี้วัด {{ indicate.detail_indicate }} 
                                        </p>
                                        <v-textarea v-model="indicate.detail_eva" label="คำอธิบายเพิ่มเติม(ถ้ามี)" rows="2"></v-textarea>
                                        <v-file-input label="แนบไฟล์" @change="onFileChange($event,topic.id_topic,indicate.id_indicate)" accept="image/*,.pdf"></v-file-input>
                                        <v-select v-if="indicate.check_indicate === 'y'" :items="[1,2,3,4]" v-model="indicate.score" label="ใส่คะแนนประเมิน"></v-select>
                                        <v-text-field v-else v-model="indicate.score" type="number" label="ใส่คะแนนประเมิน"></v-text-field>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <div class="mt-4 text-center">
                        <v-btn type="submit" color="blue">บันทึกคะแนน</v-btn><br><br>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 2 || user.status_eva === 3" type="success">คุณกรอกแบบประเมินแล้ว</v-alert>
                <v-alert v-else type="warning">คุณยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
const topics = ref([])
const user = ref({})
const token = localStorage.getItem('token')
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/selfeva`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ประเมินไม่สำเร็จ',err)
    }
}

const fetchTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/selfeva/indicate`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        topics.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลตัวชี้วัดไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})
const fileMap = ref<Record<string,string>>({})
const onFileChange = (event:Event,id_topic:number,id_indicate:number) =>{
    const file = (event.target as HTMLInputElement)?.files?.[0]
    if(!file)return
    fileMap.value[`${id_topic}-${id_indicate}`] = file
}
const saveScore = async () =>{
    const formData = new FormData()
    const allScore = topics.value.flatMap(topic =>
        topic.indicates.map((i:any) =>{
            const key = `${topic.id_topic}-${i.id_indicate}`
            const file = fileMap.value[key]
            if(file) formData.append(`file_${key}`,file)
            return{
                id_topic:topic.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
                detail_eva:i.detail_eva ?? null,
                file_key:file ? `file_${key}` : null
            }
        })
    )
    if(allScore.some((s) => !s.score && s.score !== 0)){
        alert('กรุณากรอกคะแนนให้ครบ')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    try{
        await axios.post(`http://localhost:3001/api/Eva/selfeva`,formData,{
            headers:{Authorization:`Bearer ${token}`}
        })
        alert('บันทึกคะแนนสำเร็จ')
        await Promise.all([fetchTopic(),fetchUser()])
    }catch(err){
        console.error('บันทึกคะแนนไม่สำเร็จ',err)
    }
}
</script>

<style scoped>

</style>