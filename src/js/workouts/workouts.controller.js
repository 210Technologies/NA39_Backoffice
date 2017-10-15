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

  newWorkoutModal(){
    let ctrl = this._workouts
    var modalInstance = this._$uibModal.open({
        component: 'appNewWorkoutModal'
   }).result.then(function (result) {
      if (result != 'cancel')
        ctrl.push(result)
    });
  }

}


export default WorkoutsCtrl;