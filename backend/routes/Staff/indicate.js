const express = require('express')
const db = require('../../db')
const router = express.Router()

// ========= DEMO =========
// API สำหรับ GET ข้อมูล ========================================================================
// router.get('/',async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error('Error Get',err)
//         res.status(500).json({message:'Error Get'})
//     }
// })
// ========= DEMO =========

// API สำหรับ GET ข้อมูล ========================================================================
router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_topic,tb_indicate where tb_indicate.id_topic=tb_topic.id_topic order by id_indicate desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router