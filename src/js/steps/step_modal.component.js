class StepModalCtrl {
  constructor( Step, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Step = Step
    this.$onInit = function () { this._step = this.resolve.step; };
    this._step_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    
  }

  edit(){
    this._showEdit = true
  }
  uploadStep(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/admin/steps/'+ this._step.id
    item.alias = 'step[src]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._step.src = response.src;
    }
    item.upload()
  }

  uploadCover(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/admin/steps/'+ this._step.id
    item.alias = 'step[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._step.cover = response.cover;
    }
    item.upload()
  }

  saveStep(){
    this._Step.update(this._step).then(
      (res) => {
        this._step = res
        this._showEdit = false
      }
    )
  }

  deleteStep(){
    this._Step.delete(this._step).then(
      (res) => {
        this.modalInstance.close('delete')
      }
    )
  }
}

let AppHeader = {
  controller: StepModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'steps/step_modal.html'
};


export default AppHeader;