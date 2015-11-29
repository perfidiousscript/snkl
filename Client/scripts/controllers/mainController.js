/**
 * Created by samuelmoss on 11/23/15.
 */
snklApp.controller('MainController', ['$scope', '$http', function($scope, $http){
    //Array to put db info into for later use
    $scope.dataArray = [];

    //Call to server to pull out all author names and dates.
    $http({
        method:'GET',
        url:'/populate'
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
            .attr('id', function (d) {
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

        author.on('click', function(d,i){
            if(selected != null){
                d3.select(selected).select('rect')
                    .attr('class','null');
                console.log("Selected: ", selected)
            }

            selected = this;

            d3.select(selected).select('rect')
                .attr('class','selected')
        });
    }
}]);