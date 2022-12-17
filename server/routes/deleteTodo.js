const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth')

router.post('/', auth, (req,res) => {
    const {id} = req.body
    console.log(id)
    Todo.findByIdAndRemove(id)
        // .sort({ date: -1 })
        .then(
            console.log('deleted')
        ).catch(err => {
            console.log(err)
        })
})

module.exports = router;