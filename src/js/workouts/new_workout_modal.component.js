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

  firstStep(){
  	this._Workout.newWorkout(this._new_workout).then(
  		(res) => {
  			this._new_workout = res
  			$('.tab-pane').hide()
		  	$('#step-2').show()
		  	$('li').removeClass('active')
		  	$('li#link-2').addClass('active')
  		}
  	)
  }

  // uploadVideo(item) {
  // 	let ctrl = this
  //   item.url = this._AppConstants.api + '/admin/exercises/'+ this._new_workout.id
  //   item.alias = 'exercise[src]'
  //   item.method = 'PUT'
  //   item.formData = this._new_workout
  //   item.onProgress = function(progress){
  //     item.progress = progress
  //   }
  //   item.onComplete = function(response){
  //     ctrl._new_workout = response;
  //     $('.tab-pane').hide()
		//   $('#step-3').show()
		//   $('li').removeClass('active')
		//   $('li#link-3').addClass('active')
  //   }
	 //  item.upload()
  // }

  uploadCover(item) {
  	let ctrl = this
    item.url = this._AppConstants.api + '/admin/workouts/'+ this._new_workout.id
    item.alias = 'exercise[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_workout = response;
      $('.tab-pane').hide()
		  $('#step-4').show()
		  $('li').removeClass('active')
		  $('li#link-4').addClass('active')
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
