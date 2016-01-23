myApp.controller('DataController',['$scope', 'projectHandler', '$rootScope','$mdDialog','Authorization','$window', function($scope, projectHandler, $rootScope, $mdDialog, Authorization,$window){
    
    
    
    $scope.task = '';
    $scope.storeProject = function(){
        //projectHandler.bindProject();
        projectHandler.createNewProject($rootScope.currentUser,$scope.project.projectName);
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
    
    $scope.showAddProject = function(ev){
        $mdDialog.show({
            controller: TaskControllerProj,
            templateUrl: 'views/addproject.html' ,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true
            
        });
        
        function TaskControllerProj($mdDialog){
            
            //$rootScope.currentProject.task = $scope.task;
            $scope.closeDialog = function() {
                $mdDialog.hide();
            };
            
            $scope.saveProject = function(){
                 
                 projectHandler.createNewProject($rootScope.currentUser,$scope.newProject.projectName);
                 $mdDialog.hide();
            }
            
        }
    
    };
    
    $scope.openGantt = function(){
      $window.location.href = "gantt.html?id:"+$rootScope.currentProject.id;  
    };
    
    $scope.ShowSubTask = function(ev,task){
        $scope.task = task;
        $mdDialog.show({
            controller: TaskControllerSubTask,
            templateUrl: 'views/addsubtask.html' ,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true
            
        });
        
         function TaskControllerSubTask($mdDialog){
           
            //$rootScope.currentProject.task = $scope.task;
            $scope.closeDialog = function() {
                $mdDialog.hide();
            };
            
            $scope.saveTask = function(){
            //     console.log(task);
                 projectHandler.saveSubTask($scope.task.taskId,$scope.subtask);
                 $mdDialog.hide();
            }
            
        }
                       
    };
}]);

