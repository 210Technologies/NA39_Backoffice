export default class Workout {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/workouts/',
      method: 'GET'
    }).then((res) => res.data);
  }
  getWorkout(id){
    return this._$http({
      url: this._AppConstants.api + '/admin/workouts/' + id,
      method: 'GET'
    }).then((res) => res.data);
  }
  update(workout){
    return this._$http({
      url: this._AppConstants.api + '/admin/workouts/' + workout.id,
      method: 'PUT',
      data: workout
    }).then((res) => res.data);
  }

  newWorkout(workout){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/workouts/',
      method: 'POST',
      data: workout
    }).then((res) => res.data);
  }
  delete(workout){
    return this._$http({
      url:  this._AppConstants.api + '/admin/workouts/' + workout.id,
      method: 'DELETE',
      data: workout
    }).then((res) => res.data)
  }


}