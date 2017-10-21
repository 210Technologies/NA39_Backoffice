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
    this._load = false
    
  }

  edit(){
    this._showEdit = true
  }

  uploadVideo(item) {
    let ctrl = this
    
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
    let ctrl = this
    for (var i = this._src_uploader.queue.length - 1; i >= 0; i--) {
      this._src_uploader.queue[i].url = this._AppConstants.api + '/admin/exercises/'+ this._exercise.id
      this._src_uploader.queue[i].method = 'PUT'
      this._src_uploader.queue[i].formData.push({title: this._exercise.title})
      this._src_uploader.queue[i].formData.push({description: this._exercise.description})
      this._src_uploader.queue[i].formData.push({status: this._exercise.status})
      if (i == 0){
        this._src_uploader.queue[i].alias = 'exercise[src]'
      }else if (i == 1){
        this._src_uploader.queue[i].alias = 'exercise[cover]'
      }
      
    }

    
    this._src_uploader.onProgressAll = function(progress){
      ctrl._load = true
    }
    this._src_uploader.onCompleteAll = function(response){
      ctrl._exercise = response;
      ctrl._load = false
      this._showEdit == false
    }
    this._src_uploader.uploadAll()
    // this._Exercise.update(this._exercise).then(
    //   (res) => {
    //     this._exercise = res
    //     this._showEdit = false
        
    //   }
    // )
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