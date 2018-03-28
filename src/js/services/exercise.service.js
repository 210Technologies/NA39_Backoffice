export default class Exercise {
  constructor(AppConstants, $http) {
    'ngInject';
    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({
      url: this._AppConstants.api + '/admin/exercises/',
      method: 'GET'
    }).then((res) => res.data);
  }

  update(exercise){
    return this._$http({
      url: this._AppConstants.api + '/admin/exercises/' + exercise.id,
      method: 'POST',
      data: exercise
    }).then((res) => res.data);
  }

  save(exercise){
    return this._$http({
      url: this._AppConstants.api + '/admin/exercises/',
      method: 'POST',
      data: exercise
    }).then((res) => res.data);
  }

  update(exercise){
    return this._$http({
      url: this._AppConstants.api + '/admin/exercises/' + exercise.id,
      method: 'PUT',
      data: exercise
    }).then((res) => res.data);
  }

  delete(exercise){
    return this._$http({
      url: this._AppConstants.api + '/admin/exercises/' + exercise.id,
      method: 'DELETE'
    }).then((res) => res.data);
  }

  new(){
    return this._$http({
      url:
      this._AppConstants.api + '/admin/exercises/new',
      method: "GET"
    }).then((res) => res.data)
  }

  edit(exercise){
    return this._$http({
      url:
      this._AppConstants.api + '/admin/exercises/' + exercise.id + '/edit',
      method: "GET"
    }).then((res) => res.data)
  }

}
