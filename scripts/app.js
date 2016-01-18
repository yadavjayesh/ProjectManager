var myApp = angular.module("mainApp", [ 'ngRoute','ngMaterial', 'firebase','ngMdIcons', 'gantt',
                                        'gantt.sortable',
                                        'gantt.movable',
                                        'gantt.drawtask',
                                        'gantt.tooltips',
                                        'gantt.bounds',
                                        'gantt.progress',
                                        'gantt.table',
                                        'gantt.tree',
                                        'gantt.groups',
                                        'gantt.resizeSensor'
                                      ]);

myApp.constant('DATABASE_URL','https://registration77.firebaseIO.com/');

myApp.run(['$rootScope','$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event,next,previous,error){
    if(error='AUTH_REQUIRED'){
        $location.path('/login');
    }//auth required
     });//event info
}]);//run
myApp.config([ '$routeProvider',
             function($routeProvider) {
                 $routeProvider.when('/login', {
                     templateUrl: 'views/login.html',
                     controller: 'RegistrationController'
                 }).when('/register', {
                     templateUrl: 'views/register.html',
                     controller: 'RegistrationController'
                 }).when('/MainPage', {
                     templateUrl: 'views/MainPage.html',
                     controller: 'DataController',
                     resolve: {
                         currentAuth: function(Authorization){
                             return Authorization.requireAuth();
                         }//currentAuth
                     }//resolve
                     
                 }).when('/Gantt', {
                     templateUrl: 'views/gantt.html',
                     controller: 'Ctrl'
                 
                 }).otherwise({
                     redirectTo: '/login'
                 });
             }]);

myApp.controller('MainController',['$scope','Authorization', '$mdSidenav', '$location','$rootScope', 'projectHandler', function($scope,Authorization,$mdSidenav,$location, $rootScope, projectHandler){
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    
    $scope.sidebarNav = function(item){
        console.log(item.method);
        if(item.link){
            $location.url(item.link);
        }
        else{
           item.method();
           
        }
    };
    
    $scope.getTaskProject = function(proj){
        projectHandler.getTaskProject(proj);
    };
    
    $scope.menu = {
        login : {
            name: 'Login',
            icon: 'login',
            l_hid: "!currentUser",
            link: '/login'
        },
        register : {
            name: 'Register',
            icon: 'person_add',
            l_hid: "!currentUser",
            link: '/register'
        },
        logout:{
            name: 'Logout',
            icon: 'logout',
            l_hid: "currentUser",
            link: '',
            method: function(){
                Authorization.logout();
            }
        },
        dashboard:{
            name: 'Dashboard',
            icon: 'dashboard',
            l_hid: "currentUser",
            link: '/MainPage'
        }
    };
    
  
                        
}]);

myApp.controller('Ctrl', ['$scope', function ($scope) {
    $scope.data = [
        { name:"row1", tasks:[{name:"task1", from:'1/1/2016', to:'2/1/2016'}]        }
    ];
}]);

