function PhotosConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.photos', {
    url: '/photos',
    controller: 'PhotosCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'photos/photos.html',
    title: 'Photos',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      photos: function(Photo, $state, $stateParams) {
        return Photo.all().then(
          (res) => res,
          (err) => $state.go('app.home')
        );
      },
      category_photos: function(CategoryPhoto, $state, $stateParams) {
        return CategoryPhoto.all().then(
          (res) => res,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default PhotosConfig;