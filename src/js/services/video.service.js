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
      url: this._AppConstants.api + '/admin/videos/' + video.id,
      method: 'PUT',
      data: video
    }).then((res) => res.data);
  }

  save(video){
    return this._$http({
      url: this._AppConstants.api + '/admin/videos/',
      method: 'POST',
      data: video
    }).then((res) => res.data);
  }

  delete(video){
    return this._$http({
      url: this._AppConstants.api + '/admin/videos/' + video.id,
      method: 'DELETE'
    }).then((res) => res.data);
  }

  new(){
    return this._$http({
      url:
      this._AppConstants.api + '/admin/videos/new',
      method: "GET"
    }).then((res) => res.data)
  }

  edit(video){
    return this._$http({
      url:
      this._AppConstants.api + '/admin/videos/' + video.id + '/edit',
      method: "GET"
    }).then((res) => res.data)
  }

}
