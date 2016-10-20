var express = require('express'),
    app = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Renders {{name}} in the html with the set value
app.get('/', function(req, res) {
    res.render('main', { name : 'World' });
});

app.use(function(req, res){
    res.sendStatus(404);
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
