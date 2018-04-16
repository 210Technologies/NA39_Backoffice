export default class Users {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all(page, name) {
    if (name){
      var url = this._AppConstants.api + '/admin/users?page=' + page + '&by_name=' + name
    }else{
      var url = this._AppConstants.api + '/admin/users?page=' + page 
    }

    return this._$http({
      url: url,
      method: 'GET'
    }).then((res) => res.data);
  }
  getUser(id){
    return this._$http({
      url: this._AppConstants.api + '/admin/users/' + id,
      method: 'GET'
    }).then((res) => res.data);
  }
  update(user){
    return this._$http({
      url: this._AppConstants.api + '/admin/users/' + user.id,
      method: 'PUT',
      data: user
    }).then((res) => res.data);
  }

  newWorkout(user){
    return this._$http({
      url: this._AppConstants.api + '/admin/users/',
      method: 'POST',
      data: user
    }).then((res) => res.data);
  }
  delete(user){
    return this._$http({
      url:  this._AppConstants.api + '/admin/users/' + user.id,
      method: 'DELETE',
      data: user
    }).then((res) => res.data)
  }
  getSkills(id){
    return this._$http({
      url: this._AppConstants.api + '/admin/users/' + id + '/skills',
      method: 'GET'
    }).then((res) => res.data);
  }
  getWorkouts(id){
    return this._$http({
      url: this._AppConstants.api + '/admin/users/' + id + '/workouts',
      method: 'GET'
    }).then((res) => res.data);
  }


}
