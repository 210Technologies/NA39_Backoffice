export default class StepWorkout {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/step_workouts/',
      method: 'GET'
    }).then((res) => res.data);
  }

  update(step){
    return this._$http({
      url: this._AppConstants.api + '/admin/step_workouts/' + step.id,
      method: 'PUT',
      data: step
    }).then((res) => res.data);
  }

  save(step){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/step_workouts/',
      method: 'POST',
      data: step
    }).then((res) => res.data);
  }

  delete(step){
    return this._$http({
      url: this._AppConstants.api + '/admin/step_workouts/' + step.id,
      method: 'DELETE'
    }).then((res) => res.data);
  }

}