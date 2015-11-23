/**
 * Created by samuelmoss on 11/23/15.
 */
var snklApp = angular.module('snklApp', ['ngRoute']);

snklApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/main', {
            templateUrl:"/assets/views/routes/main.html",
            controller:"MainController"
        }).
        otherwise({
            redirectTo:'main'
        })
}]);