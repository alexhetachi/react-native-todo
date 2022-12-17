const express = require('express');
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI');
// const path = require('path');
const cors = require('cors')

const app = express();

//bodyParser middleware
app.use(express.json());

app.use(cors()) // Use this after the variable declaration

//Mongoose Connection
mongoose
    .connect(db,{ useNewUrlParser: true , useCreateIndex:true, useUnifiedTopology: true })
    .then( console.log('Connected to Mongoose'))
    .catch(err => console.log(err))


//routes
app.use('/api/signup',require('./routes/api/signup'));
app.use('/api/login',require('./routes/api/login'));
app.use('/api/fetchTodos',require('./routes/fetchTodos'));
app.use('/api/deleteTodo',require('./routes/deleteTodo'));
app.use('/api/addTodo',require('./routes/addTodo'));
// //Serve static asserts if in production
// if(process.env.NODE_ENV === 'production'){
//     //Set static folder
//     app.use(express.static('client/build'));
    

//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }


const port = process.env.PORT || 5000 ;
app.listen(port, ()=>{ console.log(`server running on port ${port}`)} );