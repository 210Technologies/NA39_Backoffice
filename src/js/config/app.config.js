import authInterceptor from './auth.interceptor';

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';
  
  // Push our interceptor for auth
  $httpProvider.interceptors.push(authInterceptor);

  // if (!$httpProvider.defaults.headers.get) {
  //       $httpProvider.defaults.headers.get = {};    
  //   }    

  //   // Answer edited to include suggestions from comments
  //   // because previous version of code introduced browser-related errors

  //   //disable IE ajax request caching
  //   $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
  //   // extra
  //   $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  //   $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
  // /*
  //   If you don't want hashbang routing, uncomment this line.
  //   Our tutorial will be using hashbang routing though :)
  // */
  // $locationProvider.html5Mode(true);

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    resolve:{
      auth: function(User) {
        return User.verifyAuth();
      }
    }
  });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
