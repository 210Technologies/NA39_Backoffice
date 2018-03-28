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
    this._Exercise.edit(exercise).then(
      (res) => {
        var modalInstance = this._$uibModal.open({
          component: 'appExerciseModal',
          backdrop: 'static',
          resolve:{
              exercise: function() {
                return exercise;
              },
              s3_url: function(){
                return res;
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
    )
  }

  newExerciseModal(){
    let ctrl = this._exercises
    this._Exercise.new().then(
      (res) => {
        var modalInstance = this._$uibModal.open({
            component: 'appNewInstanceModal',
            backdrop: 'static',
            resolve:{
                s3_url: function(){
                  return res;
                },
                service: function(){
                  return ctrl._Exercise;
                },
                item_name: function(){
                  return 'exercise';
                }
            }
        }).result.then(function (result) {
          ctrl.push(result)
        });
      }
    )
  }

}


export default ExercisesCtrl;
