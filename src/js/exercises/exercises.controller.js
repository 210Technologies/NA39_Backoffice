class ExercisesCtrl {
  constructor(exercises, Exercise, $uibModal) {
    'ngInject';
    this._exercises = exercises
    this._Exercise = Exercise
    this._$uibModal = $uibModal
    this._newCat = false
    // Bind is req'd because the logout method assumes
    // the execution context is within the User object.
    // this.logout = User.logout.bind(User); 
  }

  exerciseModal(exercise){
    let ctrl = this
    console.log(this)
      var modalInstance = this._$uibModal.open({
                
                component: 'appExerciseModal',
                resolve:{
                    exercise: function() {
                      return exercise;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      ctrl._exercises[ctrl._exercises.indexOf(exercise)] = result
    });
  }

  newExerciseModal(){
    let ctrl = this._exercises
    var modalInstance = this._$uibModal.open({
        component: 'appNewExerciseModal'
   }).result.then(function (result) {
      ctrl.push(result)
    });
  }

}


export default ExercisesCtrl;