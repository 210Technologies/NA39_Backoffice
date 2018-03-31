class StepModalCtrl {
  constructor( Step, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Step = Step
    this.$onInit = function () {
      this._step = this.resolve.step;
      this._s3_url = this.resolve.s3_url;
      this._video_uploader = new FileUploader();
      this._cover_uploader = new FileUploader();
      this._cover_uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) != -1;
        }
      });
      this._video_uploader.filters.push({
          name: 'videoFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|mp4|'.indexOf(type) !== -1;
          }
      });
      this._video_uploader.onWhenAddingFileFailed = function(item, filter){
        $ctrl._src_error = true
      }
      this._cover_uploader.onWhenAddingFileFailed = function(item, filter){
        $ctrl._cover_error = true
      }
    };
    this._AppConstants = AppConstants;
    this._uploadInProgress = false
    this._load_save = false
    this._showEdit = false
    this._load = false

  }

  uploadVideo(item) {
    let ctrl = this
    item.url = this._s3_url.url;
    item.formData.push({'key': this._s3_url.fields.key})
    item.formData.push({'success_action_status': this._s3_url.fields.success_action_status})
    item.formData.push({'acl': this._s3_url.fields.acl})
    item.method = 'POST'
    ctrl._uploadInProgress = true
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onSuccess = function(response, status, headers){
      var key = $($.parseXML(response)).find('Key').text()
      ctrl._Step.update({id: ctrl._step.id, src: ctrl._s3_url.url+ '/' + key}).then(function(res){
        ctrl._step.src = res.src;
        ctrl._uploadInProgress = false
        item.remove();
      })
    }
    item.onCancel = function(response, status, headers){
      ctrl._uploadInProgress = false
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
    item.onSuccess = function(response){
      ctrl._step.cover = response.cover;
      ctrl._uploadInProgress = false
      item.remove();
    }

    item.onCancel = function(response, status, headers){
      ctrl._uploadInProgress = false
    }
    item.upload()
  }

  saveStep(){
    this._load_save = true
    this._Step.update(this._step).then(
      (res) => {
        this._step = res
        this._showEdit = false
        this._load_save = false
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
