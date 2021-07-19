const express = require('express');
const router = express.Router();

//list of genres
const genres =[
    {id:1, name:'Action'},
    {id:2, name:'Horror'},
    {id:3, name:'Romance'},
    {id:4, name:'Thriller'},
]
// get movie genres
router.get('/',(req, res)=>{
    res.send(genres)
});

router.get('/:id',(req, res)=>{
    const genre = genres.find(the_genre => the_genre.id === parseInt(req.params.id))
    if(!genre)return res.status(404).send('This is not part of the genres')
    res.send(genre)
})

// POST GENRE
router.post('/', (req, res)=>{
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
router.put('/:id', (req, res)=>{
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
router.delete('/:id',(req, res)=>{
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

module.exports = router;