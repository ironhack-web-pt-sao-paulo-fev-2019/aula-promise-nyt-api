
const {app} = require('../config')
const {index,searchResults} = require('../actions')

app.get('/',(request,response) => {

    response.render('index')

});

app.get('/search-results',searchResults)

module.exports = app;


