angular.module('app', ['ngRoute', 'ngResource'])
  //--------------- Route Provider 
   .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/all-items.html',
        controller: 'AllItemsController',
        controllerAs: 'aic'
      })
      .when('/:id', {
        templateUrl: 'pages/item-details.html',
        controller: 'ItemDetailCtrl',
        controllerAs: 'idc'
     });
  }])

  //---------------  Services
  .factory('ItemsService', ['$resource', function($resource){
    return $resource('/shoppingItems/:id', null, {
      'update': { method:'PUT' }
    });
  }])

  //--------------- Controllers
  .controller('AllItemsController', ['ItemsService', 
    function (ItemsService) {
    var self = this;
    self.editing = [];
    self.shoppingItems = ItemsService.query();

    self.save = function(){
      if(!self.shoppingItem || self.shoppingItem.length < 1) return;
      var anItem = new ItemsService({ item: self.shoppingItem, purchased: false });
      anItem.$save(function(){
        self.shoppingItems.push(anItem);
        self.shoppingItem = ''; 
      });
    }

    self.update = function(index){
      var anItem = self.shoppingItems[index];
      ItemsService.update({id: anItem._id}, anItem);
      self.editing[index] = false;
    }

    self.edit = function(index){
      self.editing[index] = angular.copy(self.shoppingItems[index]);
    }

    self.cancel = function(index){
      self.shoppingItems[index] = angular.copy(self.editing[index]);
      self.editing[index] = false;
    }

    self.remove = function(index){
      var anItem = self.shoppingItems[index];
      ItemsService.remove({id: anItem._id}, function(){
        self.shoppingItems.splice(index, 1);
      });
    }
  }]) //AllItemsController ends

  .controller('ItemDetailCtrl', ['$routeParams', 'ItemsService', '$location', 
    function ($routeParams, ItemsService, $location) {
    var self = this;
    self.shoppingItem = ItemsService.get({id: $routeParams.id });

    self.update = function(){
      ItemsService.update({id: self.shoppingItem._id}, self.shoppingItemodo, function(){
        $location.url('/');
      });
    }

    self.remove = function(){
      ItemsService.remove({id: self.shoppingItem._id}, function(){
        $location.url('/');
      });
    }

    self.remove = function(){
      ItemsService.remove({id: self.shoppingItem._id}, function(){
        $location.url('/');
      });
    }
  }])
  