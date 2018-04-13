function UsersConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.users', {
    url: '/users',
    controller: 'UsersCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'users/users.html',
    title: 'Users',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      users: function(Users, $state, $stateParams) {
        return Users.all(1).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  })
  .state('app.user', {
    url: '/users/:id?show_video',
    controller: 'UserCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'users/user.html',
    title: 'User',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      user: function(Users, $state, $stateParams) {
        return Users.getUser($stateParams.id).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default UsersConfig;
