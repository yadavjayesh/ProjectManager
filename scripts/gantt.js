var app = angular.module('plnkrGanttStable',
    [
    'firebase',
     'gantt',
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
    ]).constant('DATABASE_URL','https://registration77.firebaseIO.com/');



app.controller('Ctrl', ['$scope','$firebaseArray','$location', 'DATABASE_URL','ProjectFetcher', function ($scope, $firebaseArray, $location, DATABASE_URL,ProjectFetcher) {
   // $scope.displayData = '';
    
    $scope.getTasks = function(){
                                var splitData = $location.absUrl().split("?");   
                                var projectID = splitData[1].split(":");
                                $scope.displayData = [];
                                projArray = $firebaseArray((new Firebase(DATABASE_URL+'projects/'+projectID[1])).child("tasks"));
                                
                                projArray.$loaded(function(projArray){
                                    for(i=0;i<projArray.length;i++){ var task = projArray[i];
                                                                     var sbTaskArray = projArray[i].subtasks;
                                                                    // console.log(sbTaskArray);
                                                                   // console.log(task);
                                                                    var data = {name:task.taskName, color:'#D4D6ED'};
                                                                    data.tasks = [];
                                                                    data.tasks.push({name:task.taskName, from:task.taskStartDate, to: task.taskEndDate, color:'#FBEF01'});
                                                                    
                                                                   
                                                                    
                                                                  //  console.log(data);
                                //    var data = {name:task.taskName, tasks:[{name:task.taskName, from:task.taskStartDate, to: task.taskEndDate}]};
                                                                    $scope.displayData.push(data);
                                                    }
                                    /*$scope.displayData = [{name: 'Milestones', height: '3em', sortable: false, classes: 'gantt-row-milestone', color: '#45607D', tasks: [
                   // Dates can be specified as string, timestamp or javascript date object. The data attribute can be used to attach a custom object
                   {name: 'Kickoff', color: '#93C47D', from: '2013-10-07T09:00:00', to: '2013-10-07T10:00:00', data: 'Can contain any custom data or object'},
                   {name: 'Concept approval', color: '#93C47D', from: new Date(2013, 9, 18, 18, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0), est: new Date(2013, 9, 16, 7, 0, 0), lct: new Date(2013, 9, 19, 0, 0, 0)},
                   {name: 'Development finished', color: '#93C47D', from: new Date(2013, 10, 15, 18, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)},
                   {name: 'Shop is running', color: '#93C47D', from: new Date(2013, 10, 22, 12, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0)},
                   {name: 'Go-live', color: '#93C47D', from: new Date(2013, 10, 29, 16, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
               ], data: 'Can contain any custom data or object'}]*/
                                });
                               
    };
   
    $scope.getTasks();
                        
                                           
                                          
    
//    $scope.data = projectHandler.getProjectTaskData();
  // $scope.getTasks();
    
   
        
    
    

}]);


app.factory('ProjectFetcher', ['$rootScope', '$firebaseArray','$q', 'DATABASE_URL', function($rootScope,$firebaseArray, $q, DATABASE_URL){
    
    var myObject = {
        getData: function(projectID){
          var data = [];
          var deferred = $q.defer();
          var projArray = $firebaseArray((new Firebase(DATABASE_URL+'projects/'+projectID)).child("tasks"));
          projArray.$loaded(function(projArray){
              for(var i=0;i<projArray.length;i++)
              {
                   var task = projArray[i];
                 //  console.log(task);
                   var obj = { name:task.taskName, task:[ { name:task.taskName, from:task.taskStartDate, to:task.taskEndDate } ] };
                   data.push(obj);
                  
              }
              deferred.resolve(data);
          }, function(error){
              console.error("Error: error");
          });
            
        return deferred.promise;
        }
        
    };
    return myObject;
}]);
