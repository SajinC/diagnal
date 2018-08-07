var app = angular.module('testApp', ['angularGrid']);

app.controller('appController', function($scope, apiService) {
    $scope.search = '';
    var page = 1;
    $scope.allData = [];
    $scope.images = [];
    $scope.loadData = function(){
        apiService.getJsonData(page).then(function(data){
            $scope.title = data.page.title;
            $scope.allData = $scope.allData.concat(data.page.contentitems.content);
            $scope.images = $scope.images.concat(data.page.contentitems.content);

        });
    };

    window.addEventListener("scroll", function (event) {
        var scroll = this.scrollY;
        var w = window.innerHeight;
        if(scroll > w){
            page = page+1;
            if(page<4)$scope.loadData()
        }
    });
    
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
    this.getJsonData = function (num) {
        var d = $q.defer();
        $http.get("API/CONTENTLISTINGPAGE-PAGE"+num+".json").then(function (res) {
            d.resolve(res.data)
        });
        return d.promise;
    }
});

app.directive("whenScrolled", function(){
    return function(scope, elem, attr){
      
        // we get a list of elements of size 1 and need the first element
       var raw = elem[0];
      console.log(raw, attr.whenScrolled, elem)
        // we load more elements when scrolled past a limit
        elem.bind("scroll", function(){
            alert()
          if(raw.scrollTop+raw.offsetHeight >= raw.scrollHeight){
          // we can give any function which loads more elements into the list
            scope.$apply(attr.whenScrolled);
          }
        });
      }
  });