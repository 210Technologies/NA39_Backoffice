export default class Video {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/videos/',
      method: 'GET'
    }).then((res) => res.data);
  }

  update(video){
    return this._$http({
      url: this._AppConstants.api + '/admin/videos/' + video.video.id+ '/update_video',
      method: 'POST',
      data: video
    }).then((res) => res.data);
  }

  newCat(cat){
    return this._$http({
      url:  this._AppConstants.api + '/admin/category_videos',
      method: 'POST',
      data: cat
    }).then((res) => res.data)
  }

  newVideo(video){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/videos/',
      method: 'POST',
      data: video
    }).then((res) => res.data);
  }
  // Retrieve a user's profile
  // get() {
  //   return this._$http({ 
  //     url: this._AppConstants.api + '/profiles/' + username,
  //     method: 'GET'
  //   }).then((res) => res.data.profile);
  // }


}