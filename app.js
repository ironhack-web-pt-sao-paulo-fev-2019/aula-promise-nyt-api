require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const app = express();
const path = require('path');

const fetch = require('node-fetch');


app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(`${__dirname}/views/partials`);

const key = process.env.KEY;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/search-results', (request, response) => {
  // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey

  const search = request.query.q;
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${key}`;
  fetch(URL)
    .then(data => data.json())
    .then(json => json.response.docs)
    .then((news) => {
      // eslint-disable-next-line no-console
      console.log(news[0]);
      response.render('search-results', { news });
    });
});

app.listen(3000);
