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

  upload(item){
    return this._$http({
      url: this._AppConstants.api + '/admin/items/' + item.id+ '/update_item',
      method: 'POST',
      data: item
    }).then((res) => res.data);
  }

  save(item){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/items/',
      method: 'POST',
      data: item
    }).then((res) => res.data);
  }

  update(item){
    return this._$http({
      url: this._AppConstants.api + '/admin/items/' + item.id,
      method: 'PUT',
      data: item
    }).then((res) => res.data);
  }

  delete(item){
    return this._$http({
      url: this._AppConstants.api + '/admin/items/' + item.id,
      method: 'DELETE'
    }).then((res) => res.data);
  }
}