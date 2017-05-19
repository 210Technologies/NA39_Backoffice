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

  update(workout){
    return this._$http({
      url: this._AppConstants.api + '/admin/workout/' + workout.id+ '/update_workout',
      method: 'POST',
      data: workout
    }).then((res) => res.data);
  }

  newWorkout(workout){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/workout/',
      method: 'POST',
      data: workout
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