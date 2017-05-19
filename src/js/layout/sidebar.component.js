class AppSidebarCtrl {
  constructor(AppConstants, $rootScope) {
    'ngInject';
    this.appName = AppConstants.appName;

    // Get today's date to generate the year
    this.date = new Date();
    this.navbar = $rootScope.navbar
  }
}

let AppSidebar = {
	controller: AppSidebarCtrl,
	templateUrl: 'layout/sidebar.html'
};
export default AppSidebar;
