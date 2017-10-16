export default class Exercise {
  constructor(AppConstants, $http) {
    'ngInject';
    console.log(AppConstants.api)
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
      url: this._AppConstants.api + '/admin/exercises/' + exercise.id+ '/update_exercise',
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
  // Retrieve a user's profile
  // get() {
  //   return this._$http({ 
  //     url: this._AppConstants.api + '/profiles/' + username,
  //     method: 'GET'
  //   }).then((res) => res.data.profile);
  // }


}