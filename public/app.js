'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('top-pack', [
    'ngAnimate',
    'ui.router',
    'toastr'
]).config(['$stateProvider', '$httpProvider', '$urlRouterProvider', 'toastrConfig',
    function ($stateProvider, $httpProvider, $urlRouterProvider, toastrConfig) {

        $stateProvider.state('/home', {
            url: '/',
            templateUrl: 'sections/search/search.html'
        });
        $urlRouterProvider.otherwise('/');
    }]).run(['$rootScope', function ($rootScope) {
}])

app.controller('AppController', function () {
});

app.service('HttpService', ['$http', function ($http) {
    this.search = function (key) {
        return $http.get('/search?q=' + key)
    };
    this.import =function (repo,owner) {
        return $http.get('/import?repo=' + repo+'&owner='+owner);
    };
    this.getTopPacks =  function () {
        return $http.get('top-packs' );
    }
}]);


app.controller('SearchController', ["$scope", "HttpService", function ($scope, HttpService) {
    var self = $scope;

    self.search = function()
    {
        HttpService.search(self.key)
            .then(function (result) {
                self.searchResults = result? result.data.items :[];
            }, function (err) {
                console.log(err);
            });
    };
    self.import = function (repo) {
        HttpService.import(repo.name, repo.owner.login)
            .then(()=>{
                repo.impoted = true;
                self.getTopPacks();
            })
            .catch((err)=>{

            })

    };

    this.topPacks = null;
    self.getTopPacks = function () {
        HttpService.getTopPacks()
            .then(res => {
                this.topPacks = res.data;
            })
    };
    self.getTopPacks();
}]);

