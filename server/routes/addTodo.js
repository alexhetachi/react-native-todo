const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth')


router.post('/', auth, (req,res) => {
    const { userid, todo } = req.body;

    // console.log("it worked "+name)

    if(!todo){
        return res.status(400).json({msg:'Please enter all fields'})
    }
    else if(todo.trim()===''){
        return res.status(400).json({msg:'Please enter all fields'})
    }

    const newTodo = new Todo({
        userid,
        todo
    });

    newTodo.save()
        .then(todo => {
            res.json(todo)
        })

})

module.exports = router;