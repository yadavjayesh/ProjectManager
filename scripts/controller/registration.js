myApp.controller("RegistrationController",[ '$scope', 'Authorization', function($scope, Authorization, $mdSidenav, $location){
    
    $scope.login = function(){
        Authorization.login($scope.user);
    };
    
    $scope.register = function(){
        Authorization.register($scope.user);
    };
    
    $scope.logout = function(){
        Authorization.logout();  
        
    };
    
    
}]);