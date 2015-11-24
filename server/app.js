/**
 * Created by samuelmoss on 11/23/15.
 */
//Pull in middleware
var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var path = require('path');

//Establish location of database
var conString = ('postgres://localhost:5432/snkl_dummy');

//Estabish port
app.set('port', process.env.PORT || 5000);

//Pulls author names and date data to populate D3 visualization.
app.get('/populate', function(req,res) {

    var results = [];

    pg.connect(conString, function(err, client, done) {
        var query = client.query(
            "SELECT authors.author_name, dates.birth_year, dates.death_year, dates.first_work, dates.last_work " +
                    "FROM authors, dates " +
                    "WHERE dates.author_id = authors.id");

        query.on("row", function (row) {
            results.push(row);
        });

        query.on("end", function () {
            client.end();
            console.log("Here are the results: ", results);
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});

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
