function StepsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.steps', {
    url: '/steps',
    controller: 'StepsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'steps/steps.html',
    title: 'Steps',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      steps: function(Step, $state, $stateParams) {
        return Step.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  })

};

export default StepsConfig;