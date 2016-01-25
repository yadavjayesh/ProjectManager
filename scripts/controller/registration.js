myApp.controller("RegistrationController",[ '$scope', 'Authorization', function($scope, Authorization, $mdSidenav, $location){
    
    $scope.login = function(){
        Authorization.login($scope.user);
    };
    
    $scope.registerNewUser = function(){
        console.log($scope.user);
        Authorization.register($scope.user);
    };
    
    $scope.logout = function(){
        Authorization.logout();  
        
    };
    
    
}]);