require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const app = express();
const path = require('path');

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(`${__dirname}/views/partials`);

// Remember to insert your credentials here
// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/search-results', (req, res, next) => {

  // apiSpotify.getArtists(req.query.artist).then(data =>{

  //  console.log(data)
  //  res.render('artists', { data });
  // }).catch(error =>{
  //  console.log(error)
  // })
 
});


app.listen(3000);
