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
  })
  .state('app.workout', {
    url: '/workout/:id',
    controller: 'WorkoutCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'workouts/workout.html',
    title: 'Workout',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      workout: function(Workout, $state, $stateParams) {
        return Workout.getWorkout($stateParams.id).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default WorkoutsConfig;