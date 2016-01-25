myApp.factory('projectHandler',['$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'DATABASE_URL','$location', 
                               function($rootScope, $firebaseAuth, $firebaseObject,$firebaseArray, DATABASE_URL,$location){
                                   myObject = {
                                       self : this,
                                       
                                                                           
                                       insertProjectIntoUser: function(user, project, projectID){
                                           var connRef = new Firebase(DATABASE_URL + 'users/' + user.id);
                                           var userObject = $firebaseObject(connRef);
                                           connRef.child('projects').child(projectID).set({
                                               projectID : projectID,
                                               projectName: project
                                           });
                                       },//insertProjectIntoUser
                                       
                                       createProject: function(project){
                                           var connRef = new Firebase(DATABASE_URL + 'projects');
                                           var newDataRef = connRef.push(); 
                                           var newDataRefObject = $firebaseObject(newDataRef);
                                           var id = newDataRefObject.$id;
                                           newDataRef.set({
                                               projectName : project,
                                               timestamp : Firebase.ServerValue.TIMESTAMP,
                                               id: id
                                           });
                                           
                                          return id;
                                           
                                       },
                                       
                                       createNewProject: function(user, project){
                                                
                                                var projId = myObject.createProject(project);
                                                myObject.insertProjectIntoUser(user,project, projId);
                                                
                                       },
                                       
                                       
                                       
                                       getProjectUser: function(user){
                                           
                                           var connRef = new Firebase(DATABASE_URL+'users/'+$rootScope.currentUser.$id+'/projects/');
                                           var connArr = $firebaseArray(connRef);
                                           
                                           connArr.$loaded(function(dataArray){
                                               
                                               $rootScope.projectList = dataArray;
                                           }).catch(function(error){
                                               console.log(error.message);
                                           });
                                           
                                           
                                       },
                                       
                                       saveTask: function(task){
                                           
                                           $rootScope.currentProject.task = task;
                                           myObject.saveTaskIntoProject($rootScope.currentProject);
                                           
                                       },
                                       
                                       saveTaskIntoProject: function(project){
                                           
                                           var connRef = new Firebase(DATABASE_URL+'projects/'+project.id+'/tasks');
                                           var newRef = connRef.push();
                                           var obj = $firebaseObject(newRef);
                                        
                                           newRef.set({
                                                        taskId: obj.$id,
                                                        taskName:project.task.name,
                                                        taskDetail:project.task.detail,
                                                        taskStartDate: (project.task.startDate.getMonth()+1 + '/' + project.task.startDate.getDate() + '/' + project.task.startDate.getFullYear()),
                                                        taskEndDate: (project.task.endDate.getMonth()+1 + '/' + project.task.endDate.getDate() + '/' + project.task.endDate.getFullYear()),
                                                        taskCreater: { id:$rootScope.currentUser.$id, firstName: $rootScope.currentUser.firstname }
                                                      });
                                         //  var connObject = $firebaseObject(connRef);
                                           
                                        //   connRef.child('tasks').set(project.task);
                                        //   connRef.$save();
                                       },
                                       
                                       getTaskProject(project){
                                            var connRef = new Firebase(DATABASE_URL+'projects/'+project.projectID);
                                            var proRef = $firebaseObject(connRef);
                                            proRef.$loaded(function(proArray){
                                                $rootScope.currentProject = proArray;
                                                
                                                
                                            }).catch(function(error){
                                                console.log(error.message);
                                            });
                                           
                                       },
                                       
                                       saveSubTask: function(task,subTask){
                                           var ref = ((new Firebase(DATABASE_URL+'projects/'+$rootScope.currentProject.id+'/tasks/'+task)).child('subtasks')).push();
                                           ref.set({
                                               taskName:subTask.name,
                                               taskDetail:subTask.detail,
                                               taskStartDate: (subTask.startDate.getMonth()+1 + '/' + subTask.startDate.getDate() + '/' + subTask.startDate.getFullYear()),
                                               taskEndDate: (subTask.endDate.getMonth()+1 + '/' + subTask.endDate.getDate() + '/' + subTask.endDate.getFullYear()),
                                               taskCreater: { id:$rootScope.currentUser.$id, firstName: $rootScope.currentUser.firstname }
                                           });
                                       },
                                       
                                       
                                       getProjectTaskData: function(){
                                           var project = $rootScope.currentProject;
                                           var data = [];
                                       /* console.log($rootScope.currentProject);
                                           for(task in project){
                                               var obj = { name:task.name, task:[ { name:task.name, from:task.startDate, to:task.endDate } ] };
                                               data.push(obj);
                                           }
                                           
                                           return data;*/
                                           
                                           return $rootScope.currentProject;
                                       }
                                       
                                   
                                   };
                                   
                                   return myObject;
                               }]);