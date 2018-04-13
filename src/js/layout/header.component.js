
class AppHeaderCtrl {
  constructor(AppConstants, $rootScope, User, Notification, $state) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.navbar = $rootScope.navbar;
    this.current_user = User.current
    this._User = User;
    this._$state = $state
    this._Notification = Notification
    let ctrl = this
    this._Notification.unread().then(function(res){
      ctrl._notifications = res
    })
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

  redirectNotification(notification){
    notification.read = true
    let ctrl = this
    this._Notification.update(notification).then(function(res){
      if (notification.notification_type == 'new_video'){
        ctrl._notifications.splice(ctrl._notifications.indexOf(notification), 1)
        ctrl._$state.go('app.user', {id: notification.meta.user_id, show_video: "true"})
      }
    })

  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
