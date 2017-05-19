function WorkoutsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.workouts', {
    url: '/workouts',
    controller: 'WorkoutsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'workouts/workouts.html',
    title: 'Workouts',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      workouts: function(Workout, $state, $stateParams) {
        return Workout.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default WorkoutsConfig;