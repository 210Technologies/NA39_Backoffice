class WorkoutCtrl {
  constructor(workout, Workout, $uibModal) {
    'ngInject';
    var  $ctrl = this
    this._Workout = Workout
    this._workout = workout
    this._showEdit = false
    this._$uibModal = $uibModal
    
  }

  stepModal(step){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                component: 'appStepModal',
                resolve:{
                    step: function() {
                      return step;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      ctrl._workout.steps[ctrl._workout.steps.indexOf(step)] = result
    });
  }

}

export default WorkoutCtrl;