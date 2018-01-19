class WorkoutCtrl {
  constructor(workout, Workout, $uibModal, $state, steps, StepWorkout) {
    'ngInject';
    var  $ctrl = this
    this._StepWorkout = StepWorkout
    this._Workout = Workout
    this._workout = workout
    this._steps = steps
    this._showEdit = false
    this._$uibModal = $uibModal
    this._$state = $state
    this._new_step_workout = {workout_id: workout.id, repetition: 10, break_period: 20, rank: workout.step_workouts.length + 1}
  }

  updateStepWorkout(step_workout){
    this._StepWorkout.update(step_workout).then(
      (res) => {
        this._workout.step_workouts[this._workout.step_workouts.indexOf(step_workout)] = res
      }
    )
  }

  saveStepWorkout(){
    this._StepWorkout.save(this._new_step_workout).then(
      (res) => {
        this._workout.step_workouts.push(res)
        this._new_step_workout = {workout_id: this._workout.id, repetition: 10, break_period: 20, rank: this._workout.step_workouts.length + 1}
      }
      )
  }

  deleteStepWorkout(step_workout){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return step_workout;
            },
            service: function(){
              return ctrl._StepWorkout;
            },
            message: function(){
              return 'Delete this workout step will be irreversible, are you sure?'
            }
        }
   }).result.then(function (result) {
      if (result == 'ok'){
        ctrl._workout.step_workouts.splice(ctrl._workout.step_workouts.indexOf(step_workout), 1)
      }
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