export default class Photo {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/photos/',
      method: 'GET'
    }).then((res) => res.data);
  }

  update(photo){
    return this._$http({
      url: this._AppConstants.api + '/admin/photos/' + photo.id+ '/update_photo',
      method: 'POST',
      data: photo
    }).then((res) => res.data);
  }

  newVideo(photo){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/photos/',
      method: 'POST',
      data: photo
    }).then((res) => res.data);
  }

  delete(photo){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/photos/' + photo.id,
      method: 'DELETE'
    }).then((res) => res.data);
  }
}