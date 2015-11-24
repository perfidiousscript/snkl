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
    }).success(function(data){
        d3.select('.showData').selectAll("p")
            .data(data)
            .enter()
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
            .text(function(d){
               return d.author_name;
            });
    });



    //console.log("This works");
    //$scope.thing = {
    //    text : "Controller works!"
    //}
}]);