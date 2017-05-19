export default class Item {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/items/',
      method: 'GET'
    }).then((res) => res.data);
  }

  update(photo){
    return this._$http({
      url: this._AppConstants.api + '/admin/items/' + photo.id+ '/update_item',
      method: 'POST',
      data: photo
    }).then((res) => res.data);
  }

  newCat(cat){
    return this._$http({
      url:  this._AppConstants.api + '/admin/item_categories',
      method: 'POST',
      data: cat
    }).then((res) => res.data)
  }

  newVideo(photo){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/items/',
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