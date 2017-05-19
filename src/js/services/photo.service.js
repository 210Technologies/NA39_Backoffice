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

  newCat(cat){
    return this._$http({
      url:  this._AppConstants.api + '/admin/category_photos',
      method: 'POST',
      data: cat
    }).then((res) => res.data)
  }

  newVideo(photo){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/photos/',
      method: 'POST',
      data: photo
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