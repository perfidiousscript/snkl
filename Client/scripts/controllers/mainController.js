/**
 * Created by samuelmoss on 11/23/15.
 */
snklApp.controller('MainController', ['$scope', '$http', function($scope,$http){
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
    $scope.populateGraph = function(data){
        //Selects the .showData div
        //Defines data as the data passed
        //back from the server.
        var authors = d3.select('.showData').selectAll("div").data(data);

        //Creates a unique div for each author
        //Gives each author div a class and unique id
        //Positions each author div according to
        //the workspan and style values associated with them
        authors.enter()
            .append("div")
            .attr('class','author')
            .attr('id',function(d){
                return "'"+ d.author_name +"'";
            })
            .style({
                'left': function(d) {
                    return ((d.first_work - 1915) * 9) + "px"
                },
                'top': function(d) {
                    return (d.style * 5) + "px"
                },
                'width': function(d) {
                    return ((d.last_work - d.first_work) * 9) + "px"
                }
            })
            //Sets the text within each
            //author div equal to their name
            .text(function(d){
                return d.author_name;
            });
    };
}]);

