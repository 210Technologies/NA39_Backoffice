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
      var modalInstance = this._$uibModal.open({
                component: 'appExerciseModal',
                backdrop: 'static',
                resolve:{
                    exercise: function() {
                      return exercise;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      if (result != 'delete'){
        ctrl._exercises[ctrl._exercises.indexOf(exercise)] = result
      }else{
        ctrl._exercises.splice(ctrl._exercises.indexOf(exercise), 1)
      }
    });
  }

  newExerciseModal(){
    let ctrl = this._exercises
    var modalInstance = this._$uibModal.open({
        component: 'appNewExerciseModal',
        backdrop: 'static'
   }).result.then(function (result) {
      ctrl.push(result)
    });
  }

}


export default ExercisesCtrl;