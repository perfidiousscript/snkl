/**
 * Created by samuelmoss on 11/23/15.
 */
var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var path = require('path');

var conString = ('postgres://localhost:5432/snkl_dummy');



app.set('port', process.env.PORT || 5000);

app.get('/*', function(req,res){
    var file = req.params[0] || './assets/views/index.html';
    res.sendFile(path.join(__dirname,'./Public',file))
});

app.listen(app.get('port'),function(){
     console.log("d(=^.^=)b Listening on port :", app.get('port'));
    }
);
