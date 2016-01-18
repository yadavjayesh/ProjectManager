myApp.factory('Authorization', [ '$rootScope', '$firebaseAuth', '$firebaseObject', 'DATABASE_URL', '$location', function($rootScope, $firebaseAuth, $firebaseObject, DATABASE_URL, $location){
    
    var firebaseAuthRef = new Firebase(DATABASE_URL);
    var firebaseAuth = $firebaseAuth(firebaseAuthRef);
    
    firebaseAuth.$onAuth(function(authUser){
        if(authUser){
          var userRef = new Firebase(DATABASE_URL + 'users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
            
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
                $rootScope.success="Yes";
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
                 $location.path('/login');
            });//promise
        },//register
        
        requireAuth : function(){
            return firebaseAuth.$requireAuth();
        },
        
        logout: function(){
            firebaseAuth.$unauth();
            $location.path("/login");
        }
    };//myObject
    return myObject;
} ]);