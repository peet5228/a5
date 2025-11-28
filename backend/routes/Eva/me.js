const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken} = require('../../middleware/authMiddleware')

router.get('/',verifyToken,async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member where id_member=?`,
            [id_member]
        )
        res.json(rows[0])
    }catch(err){
        console.error('GET User Failed',err)
        res.status(500).json({message:'GET User Failed'})
    }
})

router.put('/',verifyToken,async (req,res) => {
    try{
        const id_member = req.user.id_member
        const {first_name,last_name,email,username,password} = req.body
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=? where id_member=?`,
            [first_name,last_name,email,username,password,id_member]
        )
        res.json({message:'แก้ไขสำเร็จ'})
    }catch(err){
        console.error('PUT User Failed',err)
        res.status(500).json({message:'PUT User Failed'})
    }
})

module.exports = router