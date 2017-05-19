function VideosConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.videos', {
    url: '/videos',
    controller: 'VideosCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'videos/videos.html',
    title: 'Videos',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      videos: function(Video, $state, $stateParams) {
        return Video.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      },
      category_videos: function(CategoryVideo, $state, $stateParams) {
        return CategoryVideo.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default VideosConfig;