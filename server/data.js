/**
 * Created by samuelmoss on 11/29/15.
 */
var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();

//Establish location of database
var conString = ('postgres://localhost:5432/snkl_dummy');

//Pulls author names and date data to populate D3 visualization.
app.get('/populate', function(req,res) {

    var results = [];

    pg.connect(conString, function(err, client, done) {
        var query = client.query(
            "SELECT authors.author_name, authors.style, authors.id, dates.birth_year, dates.death_year, dates.first_work, dates.last_work " +
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

module.exports= app;