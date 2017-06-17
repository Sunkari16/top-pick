'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('top-pack', [
    'ngAnimate',
    'ui.router',
    'toastr',
]).config(['$stateProvider',  '$urlRouterProvider', 'toastrConfig',
    function ($stateProvider, $urlRouterProvider, toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: false,
            positionClass: 'toast-top-full-width',
            tapToDismiss: true,
            timeOut: 5000
        });
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


app.controller('SearchController', ["$scope", "HttpService",'toastr', function ($scope, HttpService,toastr) {
    var self = $scope;

    self.search = function()
    {
        if(!self.key){
            return  toastr.error("Enter a valid key to search repos");
        }
        HttpService.search(self.key)
            .then(function (result) {
                self.searchResults = result? result.data.items :[];
            }, function (err) {
                toastr.error(err.message||err.data.message);
            });
    };
    self.import = function (repo) {
        HttpService.import(repo.name, repo.owner.login)
            .then(()=>{
                repo.imported = true;
                self.getTopPacks();
            }, function(err){
                toastr.error(err.message||err.data.message);
            })

    };

    this.topPacks = null;
    self.getTopPacks = function () {
        HttpService.getTopPacks()
            .then(res => {
                this.topPacks = res.data;
            }, function(err){
                toastr.error(err.message||err.data.message);
            })
    };
    self.getTopPacks();
}]);

