/**
 * Created by samuelmoss on 11/23/15.
 */
snklApp.controller('MainController', ['$scope', '$http', function($scope, $http){

    //Array to put db info into for later use
    $scope.dataArray = [];

    //Call to server to pull out all author names and dates.
    $http({
        method:'GET',
        url:'data/populate'
    }).success(function(data) {
            $scope.populateGraph(data);
        }
    );

    //This function takes the author names and lifespan/workspan
    //dates from db
    //and translates these values into elements on the DOM
    // that reflect this data.
    $scope.populateGraph = function(data) {

        //Selects the .showData div
        //Defines data as the data passed
        //back from the server.
        var svg = d3.select('.showData').append('svg');

        var xScale = d3.scale.linear().domain([1915, 2015]).range([0, 900]);
        var xScale1 = d3.scale.linear().domain([0, 100]).range([0, 900]);
        var yScale = d3.scale.linear().domain([0, 100]).range([0, 500]);

        svg.attr("width", 900);
        svg.attr("height", 500);

        var author = svg.selectAll("g")
            .data(data)
            .enter().append('g');

        var selected;

        //Creates a unique div for each author
        //Gives each author div a class and unique id
        //Positions each author div according to
        //the workspan and style values associated with them
        author.append("rect")
            .attr('class', 'author')
            .attr('class', function (d) {
                return "'" + d.id + "'";
            })
            .attr('width', function (d) {
                return xScale1(d.last_work - d.first_work)
            })
            .attr('height', 20)
            .attr('x', function (d) {
                return xScale((d.last_work - d.first_work) / 2 + d.first_work)
            })
            .attr('y', function (d) {
                return yScale(d.style)
            });

        //Appends a line onto each author 'rect'
        //that spreads from that author's birthyear to their death year.
        author.append('line')
            .attr('y1', function(d){
                return yScale(d.style + 2)
            })
            .attr('y2', function(d){
                return yScale(d.style + 2)
            })
            .attr('x1', function(d){
                return xScale(d.birth_year)
            })
            .attr('x2', function(d){
                return xScale(d.death_year)
            })
            .style({stroke: 'black', 'stroke-width': '2px'});

        author.append('circle')
            .attr('cy', function(d){
                return yScale(d.style)
            })
            .attr('cx', function(d){
                return xScale(d.last_work)
            })
            .attr('r', 7)
            .style('fill', 'blue')
            .attr('class', 'details')
            .text('Details')
            .on('click', function(d){
                $scope.details(d)
            });

        //Sets the text within each
        //author div equal to their name
        author.append("text")
            .attr('x', function (d) {
                return xScale((d.last_work - d.first_work) / 2 + d.first_work)
            })
            .attr('y', function (d) {
                return yScale(d.style + 3)
            })
            .style('fill', 'white')
            .text(function (d) {
                return d.author_name;
            });


        //author.on('click', function(d,i){
        //    console.log("HERE IS D: ", d, i);
        //    d3.xhr('/data/connections')
        //        .send('GET', d, function(error, data){
        //            if(error){
        //                console.log("error: ", error)
        //            }
        //            console.log(data);
        //        })
        //    });


        author.selectAll('rect').on('click', function (d, i) {

            //Checks to see if an author rect is already selected,
            //if so it removes the selected class from the previously selected rect.
            //In all cases it adds the selected class to the newly selected author rect.
            if (selected != null) {
                d3.select(selected).select('rect')
                    .attr('class', 'null');
            }

            selected = this;


            d3.select(selected).select('rect')
                .attr('class', 'selected');


            //Call to server to pull down
            //author connections data from db.
            $http({
                method: 'POST',
                url: 'data/connections',
                data: d
            }).success(function (data) {
                    $scope.connections(data);
                }
            );
        });


        $scope.connections = function (authorArray) {
            var connectionTypeScale = d3.scale.ordinal().domain([1, 2, 3]).range(['red', 'green', 'blue']);
            // console.log("Author array: ", authorArray);


            var authorRectangle = d3.select('svg').selectAll('rect');

            d3.select('svg').selectAll('line').remove();


            for (var i = 0; i < authorArray.length; i++) {

                var styleObject = {
                    "stroke-width": 4,
                    stroke: connectionTypeScale(parseInt(authorArray[i].type))
                };

                author.append('line')
                    .attr("x1", authorRectangle.filter(
                        function (d) {
                            return d.id == authorArray[i].author_1;
                        })
                        .attr('x')
                )
                    .attr("y1", authorRectangle.filter(
                        function (d) {
                            return d.id == authorArray[i].author_1;
                        })
                        .attr('y')
                )
                    .attr("x2", authorRectangle.filter(
                        function (d) {
                            return d.id == authorArray[i].author_2;
                        })
                        .attr('x')
                )
                    .attr("y2", authorRectangle.filter(
                        function (d) {
                            return d.id == authorArray[i].author_2;
                        })
                        .attr('y')
                )
                    .style(styleObject);
            }
        };

        $scope.details = function(authorData){
            $http({
                method: 'POST',
                url: 'data/details',
                data: authorData
            }).success(function(data){
                console.log(data);
            })
        };

        //author.append('line')
        //    .data(authorArray)
        //    .attr('x1', function(d){
        //        return d3.select('rect').id(d.author_1).x();
        //    });


        //console.log("Here is the abstracted data call: ", data)
    };
}]);
