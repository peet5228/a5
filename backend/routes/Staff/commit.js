const express = require('express')
const db = require('../../db')
const router = express.Router()

// API สำหรับ GET ข้อมูล
// router.get('/',async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error('Error Get',err)
//         res.status(500).json({message:'Error Get'})
//     }
// })

// API สำหรับ GET ข้อมูล
router.get('/header/:id_eva',async (req,res) => {
    try{
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_system,tb_eva,tb_member where tb_eva.id_eva='${id_eva}' and tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys and status_eva=1 order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ GET ข้อมูล
router.get('/:id_eva',async (req,res) => {
    try{
        const {id_eva} = req.params
        const [before] = await db.query(`select id_member,concat(first_name,' ',last_name)as fullname_commit from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        const [after] = await db.query(`select id_commit,tb_member.id_member,first_name,last_name,level_commit as role from tb_commit , tb_eva , tb_member where tb_commit.id_eva='${id_eva}' and tb_commit.id_eva=tb_eva.id_eva and tb_commit.id_member=tb_member.id_member`)
        res.json({before,after})
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ Insert ข้อมูล
router.post('/:id_eva',async (req,res) => {
    try{
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where id_eva= '${id_eva}'`)
        const commit = req.body
        const values = commit.map(p => [p.id_member,id_eva,p.role,'n'])
        await db.query(`insert into tb_commit (id_member,id_eva,level_commit,status_commit) values ?`,[values])
        res.json({message:"Insert Success"})
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ Delete ข้อมูล
router.delete('/:id_commit',async (req,res) => {
    try{
        const {id_commit} = req.params
        const [rows] = await db.query(`delete from tb_commit where id_commit='${id_commit}'`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router