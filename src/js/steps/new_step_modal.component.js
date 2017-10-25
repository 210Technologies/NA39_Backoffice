class NewStepModalCtrl {
  constructor(Step, FileUploader, AppConstants) {
    'ngInject';
    let $ctrl = this;
    this._Step = Step
    this._src_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._new_step = {}
    this.step = 1
    this.next_step = 1
    this._load = false
    this._src_uploader.onAfterAddingFile = function(){
      $ctrl.step += 1
    }
    this._cover_uploader.onAfterAddingFile = function(){
      $ctrl.step += 1
    }  
  }

  enableFinish(){
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
      this.fourthStep()
    }
  }

  firstStep(){
    this._Step.save(this._new_step).then(
      (res) => {
        this._load = false
        this._new_step = res
        this.next_step += 1
      }
    )
  }

  fourthStep(){
    this.next_step += 1
    this._Step.update(this._new_step).then(
      (res) => {
        this._load = false
        this.modalInstance.close(res)
      },
      (err) => {
        this.next_step -= 1
      }
    )
  }

  uploadVideo() {
    let ctrl = this
    var item = this._src_uploader.queue[0]
    item.url = this._AppConstants.api + '/admin/steps/'+ this._new_step.id
    item.alias = 'step[src]'
    item.method = 'PUT'
    item.formData = this._new_step
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_step = response;
      ctrl.src_set = true
      ctrl._load = false
      ctrl.next_step += 1
    }
    item.upload()
  }

  uploadCover() {
    let ctrl = this
    var item = this._cover_uploader.queue[0]
    item.url = this._AppConstants.api + '/admin/steps/'+ this._new_step.id
    item.alias = 'step[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_step = response;
      ctrl.cover_set = true
      ctrl._load = false
      ctrl.next_step += 1
    }
    item.upload()
  }

}

let AppNewVideo = {
  controller: NewStepModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'steps/new_step_modal.html'
};


export default AppNewVideo;
