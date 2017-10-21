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
    this.step = 1
    this.next_step = 1
    this._load = false
    this._src_uploader.onAfterAddingFile = function(){
      $ctrl.step += 1
    }
    this._cover_uploader.onAfterAddingFile = function(){
      console.log('la')
      $ctrl.step += 1
    }  
  }

  enableFinish(){
    console.log(this.step)
    if (this.step == 4){return}
    this.step += 1
  }

  nextStep(){
    this._load = true
    if (this.step == 1){
      this.firstStep()
    }else if (this.step == 2){
        this.uploadVideo()
    }else if (this.step == 3){
        this.uploadCover()
    }else{
      this.next_step += 1
    }
  }

  firstStep(){

    this._Exercise.save(this._new_exercise).then(
      (res) => {
        this._load = false
        this._new_exercise = res
        this.next_step += 1
      }
    )
  }

  fourthStep(){
    this._Exercise.update(this._new_exercise).then(
      (res) => {
        this._load = false
        this.modalInstance.close(res)
      }
    )
  }

  uploadVideo() {
    let ctrl = this
    var item = this._src_uploader.queue[0]
    item.url = this._AppConstants.api + '/admin/exercises/'+ this._new_exercise.id
    item.alias = 'exercise[src]'
    item.method = 'PUT'
    item.formData = this._new_exercise
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_exercise = response;
      ctrl.src_set = true
      ctrl._load = false
      ctrl.next_step += 1
    }
    item.upload()
  }

  uploadCover() {
    let ctrl = this
    var item = this._cover_uploader.queue[0]
    item.url = this._AppConstants.api + '/admin/exercises/'+ this._new_exercise.id
    item.alias = 'exercise[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_exercise = response;
      ctrl.cover_set = true
      ctrl._load = false
      ctrl.next_step += 1
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
