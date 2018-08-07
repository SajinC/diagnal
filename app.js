var app = angular.module('testApp', ['angularGrid']);

app.controller('appController', function($scope, apiService) {
    $scope.search = '';
    $scope.loadData = function(){
        apiService.getJsonData().then(function(data){
            $scope.title = data.page.title;
            $scope.allData = data.page.contentitems.content;
            $scope.images = data.page.contentitems.content;
        });
    };
    
    $scope.changeSearch = function(){
        $scope.images = [];
        var y = $scope.search.toLowerCase();
        angular.forEach($scope.allData, function(val){
            if(val.name.toLowerCase().indexOf(y)!==-1)$scope.images.push(val)
        })
    };

    var init = function(){
        $scope.loadData();
    }()
});

app.service('apiService', function($http, $q) {
    this.getJsonData = function () {
        var d = $q.defer();
        $http.get("API/CONTENTLISTINGPAGE-PAGE1.json").then(function (res) {
            d.resolve(res.data)
        });
        return d.promise;
    }
});