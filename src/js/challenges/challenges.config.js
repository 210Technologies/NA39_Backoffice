function ChallengesConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.challenges', {
    url: '/challenges',
    controller: 'ChallengesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'challenges/challenges.html',
    title: 'Challenges',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      challenges: function(Challenge, $state, $stateParams) {
        return Challenge.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  })
  .state('app.challenge', {
    url: '/challenge/:id',
    controller: 'ChallengeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'challenges/challenge.html',
    title: 'Challenge',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      challenge: function(Challenge, $state, $stateParams) {
        return Challenge.getChallenge($stateParams.id).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default ChallengesConfig;