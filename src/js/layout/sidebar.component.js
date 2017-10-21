class AppSidebarCtrl {
  constructor(AppConstants, $rootScope) {
    'ngInject';
    this.appName = AppConstants.appName;

    // Get today's date to generate the year
    this.date = new Date();
    this.navbar = $rootScope.navbar
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
	   	this.navbar = false;
	    if (toState.name === 'app.login') {//toState variable see the state you're going 
	        this.navbar = false;
	    } else {
	        this.navbar = true;
	    }
  	});
  }
}

let AppSidebar = {
	controller: AppSidebarCtrl,
	templateUrl: 'layout/sidebar.html'
};
export default AppSidebar;
