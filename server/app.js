/**
 * Created by samuelmoss on 11/23/15.
 */
//Pull in middleware
var express = require('express');
var app = express();

var path = require('path');

var bodyParser = require('body-parser');

var data = require('./data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


//Estabish port
app.set('port', process.env.PORT || 5000);

//Routes all db calls to the data module
app.use('/data', data);


//Serves down static files.
app.get('/*', function(req,res){
    var file = req.params[0] || './assets/views/index.html';
    res.sendFile(path.join(__dirname,'./Public',file))
});

//Directs node to listen to the port established above and creates a message to confirm this.
app.listen(app.get('port'),function(){
     console.log("d(=^.^=)b Listening on port :", app.get('port'));
    }
);
