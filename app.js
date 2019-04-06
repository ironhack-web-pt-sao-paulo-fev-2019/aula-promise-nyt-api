const express = require('express');
const hbs = require('hbs');
const app = express();
const fetch = require('node-fetch');

require('dotenv').config();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (request, response) => {
    response.render('index');
})

app.get('/search-results', (request, response) => {
    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + process.env.API_KEY + '&q=' + request.query.q)
        .then(res => res.json())
        .then(json => {
            let data = json.response.docs;
            response.render('search', { data });
        });
})

app.listen('3000');