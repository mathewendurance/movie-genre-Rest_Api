const Joi = require('joi');
const express = require('express');
const { invalid, validate } = require('joi/lib/types/object');
const app = express()
const genre = require('./routes/genre')
const home = require('./routes/home')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
app.use(helmet())
app.use(morgan('tiny'));
app.use(express.json())
app.use('/api/genre', genre)
app.use('/api/home', home)


//working with config and development environment
console.log('Application Name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.host'));
console.log('mail password:' + config.get('mail.password'));


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enabled...');
}
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port} `);
})
