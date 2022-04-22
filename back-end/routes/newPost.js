const appendField = require('append-field');
const express = require('express')
const multer = require('multer')
const router = express.Router()
const { Post } = require('../models/Post') 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage:storage});

router.get('/new-post', (req, res)=>{
    imgModel.find({}, (err, items)=>{
        if(err){
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else{
            res.render('imagesPage', {items:items});
        }
    });
});

router.post('/new-post', upload.single('image'), (req, res, next)=>{
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img:{
            data: file.readFileSync(path.join(__dirname + '/upload/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    }
    imgModel.creat(obj, (err, item)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('new-post');
        }
    });
});

module.exports = router;