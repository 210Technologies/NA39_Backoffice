export default class Step {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/steps/',
      method: 'GET'
    }).then((res) => res.data);
  }

  update(step){
    return this._$http({
      url: this._AppConstants.api + '/admin/steps/' + step.id+ '/update_step',
      method: 'POST',
      data: step
    }).then((res) => res.data);
  }

  save(step){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/steps/',
      method: 'POST',
      data: step
    }).then((res) => res.data);
  }

  delete(step){
    return this._$http({
      url: this._AppConstants.api + '/admin/steps/' + step.id,
      method: 'DELETE'
    }).then((res) => res.data);
  }

}