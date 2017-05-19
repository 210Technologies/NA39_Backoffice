class NewExerciseModalCtrl {
  constructor(Exercise, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Exercise = Exercise
    this._src_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._new_exercise = {}
    
  }

  firstStep(){
  	this._Exercise.newExercise(this._new_exercise).then(
  		(res) => {
  			this._new_exercise = res
  			$('.tab-pane').hide()
		  	$('#step-2').show()
		  	$('li').removeClass('active')
		  	$('li#link-2').addClass('active')
  		}
  	)
  }

  uploadVideo(item) {
  	let ctrl = this
    item.url = this._AppConstants.api + '/admin/exercises/'+ this._new_exercise.id
    item.alias = 'exercise[src]'
    item.method = 'PUT'
    item.formData = this._new_exercise
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_exercise = response;
      $('.tab-pane').hide()
		  $('#step-3').show()
		  $('li').removeClass('active')
		  $('li#link-3').addClass('active')
    }
	  item.upload()
  }

  uploadCover(item) {
  	let ctrl = this
    item.url = this._AppConstants.api + '/admin/exercises/'+ this._new_exercise.id
    item.alias = 'exercise[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_exercise = response;
      $('.tab-pane').hide()
		  $('#step-4').show()
		  $('li').removeClass('active')
		  $('li#link-4').addClass('active')
    }
    item.upload()
  }
}

let AppNewExercise = {
  controller: NewExerciseModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'exercises/new_exercise_modal.html'
};


export default AppNewExercise;
