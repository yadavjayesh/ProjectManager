myApp.controller('DataController',['$scope', 'projectHandler', '$rootScope','$mdDialog', function($scope, projectHandler, $rootScope, $mdDialog){
    
    projectHandler.getProjectUser($rootScope.currentUser);
    $scope.task = '';
    $scope.storeProject = function(){
        //projectHandler.bindProject();
        projectHandler.createNewProject($rootScope.currentUser,$scope.project);
        projectHandler.getProjectUser($rootScope.currentUser);
        
        
    }
    
    $scope.getTasks = function(project){
        console.log(project);
    };
    
    
    
    $scope.showAdd = function(ev){
        $mdDialog.show({
            controller: TaskController,
            templateUrl: 'views/addtask.html' ,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true
            
        });
        
        function TaskController($mdDialog){
            
            //$rootScope.currentProject.task = $scope.task;
            $scope.closeDialog = function() {
                $mdDialog.hide();
            };
            
            $scope.saveTask = function(){
                 projectHandler.saveTask($scope.task);
                 $mdDialog.hide();
            }
            
        }
    
    };
}]);

