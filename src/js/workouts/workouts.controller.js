class WorkoutsCtrl {
  constructor(workouts, Workout, $uibModal) {
    'ngInject';
    this._workouts = workouts
    this._Workout = Workout
    this._$uibModal = $uibModal
    this._newCat = false
    // Bind is req'd because the logout method assumes
    // the execution context is within the User object.
    // this.logout = User.logout.bind(User); 
  }

  workoutModal(workout){
    let ctrl = this
    console.log(this)
      var modalInstance = this._$uibModal.open({
                
                component: 'appWorkoutModal',
                resolve:{
                    workout: function() {
                      return workout;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      ctrl._workouts[ctrl._workouts.indexOf(workout)] = result
    });
  }

  newWorkoutModal(){
    let ctrl = this._exercises
    var modalInstance = this._$uibModal.open({
        component: 'appNewWorkoutModal'
   }).result.then(function (result) {
      ctrl.push(result)
    });
  }

}


export default WorkoutsCtrl;