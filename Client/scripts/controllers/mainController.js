/**
 * Created by samuelmoss on 11/23/15.
 */
snklApp.controller('MainController', ['$scope', function($scope){

    console.log("This works");
    $scope.thing = {
        text : "Controller works!"
    }
}]);