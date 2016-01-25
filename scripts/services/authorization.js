myApp.factory('Authorization', [ '$rootScope', '$firebaseAuth', '$firebaseObject', 'DATABASE_URL', '$location', 'projectHandler', function($rootScope, $firebaseAuth, $firebaseObject, DATABASE_URL, $location, projectHandler){
    
    var firebaseAuthRef = new Firebase(DATABASE_URL);
    var firebaseAuth = $firebaseAuth(firebaseAuthRef);
    
    firebaseAuth.$onAuth(function(authUser){
        if(authUser){
          var userRef = new Firebase(DATABASE_URL + 'users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
            projectHandler.getProjectUser($rootScope.currentUser);
            $location.path("/MainPage");
        } else{
            $rootScope.currentUser = '';
        }
    });
    var myObject = {
        
        login : function(user){
            firebaseAuth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(authData){
                $rootScope.success="";
                $rootScope.user = authData;
                $location.path('/MainPage');
            }).catch(function(error){
                $rootScope.success=error.message;
            });
        },//login

        register : function(user){
            
            firebaseAuth.$createUser({
                email: user.email,
                password: user.password
            }).then(function(authData){
                var ref = new Firebase(DATABASE_URL + 'users')
                .child(authData.uid).set({
                    id: authData.uid,
                    firstname : user.firstname,
                    lastname  : user.lastname,
                    email : user.email,
                    date: Firebase.ServerValue.TIMESTAMP
                   
                });//set
                $rootScope.success = "Registered";
                $location.path('/login');
                });
                 
           
        },//register
        
        requireAuth : function(){
            return firebaseAuth.$requireAuth();
        },
        
        logout: function(){
            firebaseAuth.$unauth();
            $rootScope.currentUser = '';
            $rootScope.currentProject = '';
            $rootScope.success = 'Logged Out!!!';
            $location.path("/login");
        }
    };//myObject
    return myObject;
} ]);