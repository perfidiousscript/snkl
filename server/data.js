/**
 * Created by samuelmoss on 11/29/15.
 */
var express = require('express');
var app = express();
var pg = require('pg');

//var bodyParser = require('body-parser');
//
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({expanded: true}));

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
            //console.log("Here are the results: ", results);
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});

app.post('/connections', function(req,res) {

    var connections = [];


    //console.log("Req.body.id: ", req.body.id);

    pg.connect(conString, function (err, client, done) {
        var query = client.query(
            "SELECT connections.author_1, connections.author_2, connections.type " +
            "FROM connections " +
            "WHERE connections.author_1 = $1 OR connections.author_2 = $1;", [req.body.id]);

        query.on("row", function (row) {
            connections.push(row);
        });

        query.on("end", function () {
            client.end();
            //console.log("Here are the results: ", connections);
            return res.json(connections);
        });

        if (err) {
            console.log(err);
        }
    })
});

app.post('/details', function(req,res){

    var detailsObject = {};
    var bio = [];
    var works = [];
    var id = req.body.id;

    var bioQueryString =  "SELECT details.bio, details.image, authors.author_name " +
    "FROM details, authors " +
    "WHERE authors.id = details.author_id " +
    "AND details.author_id = $1;";

    var workQueryString =  "SELECT works.work_title, works.pub_year " +
    "FROM works " +
    "WHERE works.authorsp_key = $1;";

        pg.connect(conString, function (err, client, done) {
            var query = client.query(
                bioQueryString, [id]
            );

            query.on("row", function (row) {
                bio.push(row);
            });

            query.on("end", function () {
                client.end();

                    pg.connect(conString, function (err, client, done) {
                        var query = client.query(
                            workQueryString, [id]
                        );

                        query.on("row", function (row) {
                            works.push(row);
                        });

                        query.on("end", function () {
                            client.end();

                            detailsObject.bio = bio;
                            detailsObject.works = works;
                            res.json(detailsObject);
                        });

                        if (err) {
                            console.log(err);
                        }
                    })
            });

            if (err) {
                console.log(err);
            }
        })
});

    // make query string
    // call runQuery with your query string
    // res.json the results back to client side
    // res.json( your variable );

module.exports = app;