const express = require('express')
const db = require('../../db')
const router = express.Router()

// API สำหรับ GET ข้อมูล
router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system,tb_eva,tb_member where tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router