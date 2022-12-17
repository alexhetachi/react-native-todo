const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');


router.post('/', (req,res) => {
    const { name, email, password, password2 } = req.body;
    console.log('inside server')
    console.log(name)
    // if(!name || !email || !password || !password2){
    //     return res.status(400).json({msg:'Please enter all fields'})
    // }
    // else if(name.trim()==='' || email.trim()==='' || password==='' || password2===''){
    //     return res.status(400).json({msg:'Please enter all fields'})
    // }
    // else if(name.length < 3 || name.length > 8){
    //     return res.status(400).json({msg:'Name must contain 3-8 characters'})
    // }
    // else if(password.length < 6 || password.length > 16 ){
    //     return res.status(400).json({msg:'Password must contain 6-16 characters'})
    // }
    // else if(password !==password2){
    //     return res.status(400).json({msg:'Password does not match'})
    // }

    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg:'Email already exist'})

            const newUser = new User({
                name,
                email,
                password
            })
            console.log('inside signup server')
            // Create salt and hash
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                {id: user.id},
                                config.get('jwtSecret'),
                                (err, token) => {
                                    if(err) throw err;

                                        res.json({
                                        token,
                                        user: {
                                            id:user._id,
                                            name:user.name,
                                            email:user.email
                                        }
                                    })
                                }
                            )

                        })
                })
            })
        })

})

module.exports = router;