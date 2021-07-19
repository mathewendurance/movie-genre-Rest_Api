const Joi = require('joi');
const express = require('express');
const { invalid, validate } = require('joi/lib/types/object');
const app = express()
const genre = require('./routes/genre')
const home = require('./routes/home')
app.use(express.json())
app.use('/api/genre', genre)
app.use('/api/home', home)



const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port} `);
})
