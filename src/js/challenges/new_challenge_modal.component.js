class NewWorkoutModalCtrl {
  constructor(Workout, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Workout = Workout
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._new_workout = {level: 'easy', status: 'online'}
    
  }

  saveWorkout(){
    let ctrl = this
    var item = this._cover_uploader.queue[0]
    item.url =  this._AppConstants.api + '/admin/workouts'
    item.formData.push({'workout[title]': this._new_workout.title})
    item.formData.push({'workout[description]': this._new_workout.description})
    item.alias = 'workout[cover]'
    item.method = 'POST'
    
    item.onProgress = function(progress){
      item.progress = progress
      if (progress == 100)
        ctrl._load = true
    }
    item.onComplete = function(response, video){
      ctrl._load = false
      ctrl._new_workout = response;
      ctrl.modalInstance.close(response)
    }
    item.upload()
    
  }
}

let AppNewExercise = {
  controller: NewWorkoutModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'workouts/new_workout_modal.html'
};


export default AppNewExercise;
