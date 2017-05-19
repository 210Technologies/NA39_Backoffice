function ExerciseConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.exercises', {
    url: '/exercises',
    controller: 'ExercisesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'exercises/exercises.html',
    title: 'Exercises',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      exercises: function(Exercise, $state, $stateParams) {
        return Exercise.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default ExerciseConfig;