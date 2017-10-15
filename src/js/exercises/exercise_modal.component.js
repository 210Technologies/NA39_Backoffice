class ExerciseModalCtrl {
  constructor( Exercise, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Exercise = Exercise
    this.$onInit = function () { this._exercise = this.resolve.exercise; };
    this._src_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    
  }

  edit(){
    this._showEdit = true
  }

  uploadVideo(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/admin/exercises/'+ this._exercise.id
    item.alias = 'exercise[src]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._exercise = response;
    }
    item.upload()
  }

  uploadCover(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/admin/exercises/'+ this._exercise.id
    item.alias = 'exercise[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._exercise = response;
    }
    item.upload()
  }

  saveExercise(){
    this._Exercise.update(this._exercise).then(
      (res) => {
        this._exercise = res
        this._showEdit = false
      }
    )
  }
  deleteExercise(){
    this._Exercise.delete(this._exercise).then(
      (res) => {
        this.modalInstance.close('delete')
      }
    )
  }
}

let AppHeader = {
  controller: ExerciseModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'exercises/exercise_modal.html'
};


export default AppHeader;