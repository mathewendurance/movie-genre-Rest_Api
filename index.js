const Joi = require('joi');
const express = require('express');
const { invalid, validate } = require('joi/lib/types/object');
const app = express()
app.use(express.json())

//list of genres
const genres =[
    {id:1, name:'Action'},
    {id:2, name:'Horror'},
    {id:3, name:'Romance'},
    {id:4, name:'Thriller'},
]
// get movie genres
app.get('/vidly.com/api/genres',(req, res)=>{
    res.send(genres)
});

app.get('/vidly.com/api/genres/:id',(req, res)=>{
    const genre = genres.find(the_genre => the_genre.id === parseInt(req.params.id))
    if(!genre)return res.status(404).send('This is not part of the genres')
    res.send(genre)
})

// POST GENRE
app.post('/vidly.com/api/genres', (req, res)=>{
    //create Joi schema 
    const {error} = Joi.validate(req.body);
    if(error) return res.status(404).send(error.details[0].message)
    
    const genre = {
        id:genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genres)
})

//UPDATE
app.put('/vidly.com/api/genres/:id', (req, res)=>{
    //look for the genre, not existing return 404
    const genre = genres.find(d => d.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('the genre is not found')

    //validate genre, if invalid return 400 error
    const {error}= validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //update genre, return updated genre
    genre.name = req.body.name;
    res.send(genre);
}) 

//DELETE
app.delete('/vidly.com/api/genres/:id',(req, res)=>{
    const genre = genres.find(d=>d.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("genre not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1)

    res.send(genre)
})

validateGenre = (genre)=>{
     const schema = {name: Joi.string().min(3).required()}
    return Joi.validate(genre, schema);
}




const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port} `);
})
