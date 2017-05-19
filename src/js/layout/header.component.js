class AppHeaderCtrl {
  constructor(AppConstants, $rootScope, User) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.navbar = $rootScope.navbar;
    this.current_user = User.current
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
