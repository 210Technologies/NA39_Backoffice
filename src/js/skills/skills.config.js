function SkillsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.skills', {
    url: '/skills',
    controller: 'SkillsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'skills/skills.html',
    title: 'Vidéos',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      skills: function(Skill, $state, $stateParams) {
        return Skill.all(1).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  })


};

export default SkillsConfig;
