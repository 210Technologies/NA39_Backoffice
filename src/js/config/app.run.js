function AppRun(AppConstants, $rootScope) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
    $rootScope.setNav(toState.name)
  });
  
  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };

  $rootScope.setNav = (name) => {
    $rootScope.navbar = false;
    if (name === 'app.login') {//toState variable see the state you're going 
        $rootScope.navbar = false;
    } else {
        $rootScope.navbar = true;
    }
  }

}

export default AppRun;
