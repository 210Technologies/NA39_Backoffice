export default class CategoryVideo {
  constructor(AppConstants, $http, JWT) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT


  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/category_videos/',
      method: 'GET',
      cache:false,
      headers: {
        Authorization: this._JWT.get()
      } 
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