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
        when('/about', {
            templateUrl:"/assets/views/routes/about.html",
            controller:"AboutController"
        }).
        when('/add', {
            templateUrl:"/assets/views/routes/add.html",
            controller:"AddController"
        }).
        when('/contact', {
            templateUrl:"/assets/views/routes/contact.html",
            controller:"ContactController"
        }).
        otherwise({
            redirectTo:'main'
        })
}]);