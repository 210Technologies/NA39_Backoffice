(function () { 
 return angular.module("app.EnvironmentConfig", [])
.constant("AppConstants", {"api":"http://localhost:3000/","jwtKey":"jwtToken","appName":"Conduit"});

})();
