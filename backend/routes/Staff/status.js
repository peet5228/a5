const express = require('express')
const db = require('../../db')
const router = express.Router()

// API สำหรับ GET ข้อมูล
router.get('/:id_eva',async (req,res) => {
    try{
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member,tb_eva,tb_commit where tb_commit.id_eva='${id_eva}' and tb_eva.id_eva=tb_commit.id_eva and tb_member.id_member=tb_commit.id_member order by tb_eva.id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router