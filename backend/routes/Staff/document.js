const express = require('express')
const db = require('../../db')
const router = express.Router()
const path = require('path')
const fs = require('fs')

// Perfect Path
const uploadDir = path.join(__dirname,'../../uploads/document')

// API สำหรับ GET ข้อมูล
router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_doc order by id_doc desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ Upload
router.post('/',async (req,res) => {
    try{
        const {name_doc} = req.body
        const file = req.files?.file
        const filename = Date.now() + path.extname(file.name).toLowerCase()
        await file.mv(path.join(uploadDir,filename))
        await db.query(`insert into tb_doc (name_doc,day_doc,file) values (?,CURDATE(),?)`,[name_doc,filename])
        res.status(201).json({message:'Upload Success'})
    }catch(err){
        console.error('Error Upload',err)
        res.status(500).json({message:'Error Upload'})
    }
})

// API สำหรับ Delete Image in folder and database
router.delete('/:id_doc',async (req,res) => {
    try{
        const {id_doc} = req.params
        const [[docRow]] = await db.query(`select file from tb_doc where id_doc='${id_doc}'`)
        // file Paht
        const fp = path.join(uploadDir,docRow.file)
        if(fs.existsSync(fp)){
            fs.unlinkSync(fp)
        }
        await db.query(`delete from tb_doc where id_doc='${id_doc}'`)
        res.json({messagge:'Delete Success'})
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({message:'Error Delete'})
    }
})


module.exports = router