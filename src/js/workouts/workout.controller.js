class WorkoutCtrl {
  constructor(workout, Workout, $uibModal, $state) {
    'ngInject';
    var  $ctrl = this
    this._Workout = Workout
    this._workout = workout
    this._showEdit = false
    this._$uibModal = $uibModal
    this._$state = $state
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
  
  newStep(){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                component: 'appNewStepModal'
                
           })
    modalInstance.result.then(function (result) {
      ctrl._workout.steps.push(result)
    });
  }
  editWorkout(){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                
                component: 'appWorkoutModal',
                resolve:{
                    workout: function() {
                      return ctrl._workout;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      if (result[0] == 'save'){
        ctrl._workout = result[1]
      }
      
    });
  }
  deleteWorkout(){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return ctrl._workout
            },
            service: function(){
              return ctrl._Workout
            },
            message: function(){
              return 'Delete this workout will delete all his configurations, are you sure?'
            }
        }
   }).result.then(function (result) {
      if (result == 'ok'){
        ctrl._$state.go('app.workouts')
      }
      
    });
  }

}

export default WorkoutCtrl;