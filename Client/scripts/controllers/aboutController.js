/**
 * Created by samuelmoss on 11/23/15.
 */
snklApp.controller('AboutController', ['$scope', function($scope){

    console.log("This works");
    $scope.thing = {
        text : "About Controller works!"
    }
}]);