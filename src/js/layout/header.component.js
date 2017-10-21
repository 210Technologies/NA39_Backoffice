class AppHeaderCtrl {
  constructor(AppConstants, $rootScope, User) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.navbar = $rootScope.navbar;
    this.current_user = User.current
    this._User = User;
    // change page title based on state
  	$rootScope.$on('$stateChangeSuccess', (event, toState) => {
	   	this.navbar = false;
	    if (toState.name === 'app.login') {//toState variable see the state you're going 
	        this.navbar = false;
	    } else {
	        this.navbar = true;
	    }
  	});
  
  }
  
  logout(){
  	this._User.logout()
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
