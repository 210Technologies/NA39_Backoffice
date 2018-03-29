class VideoModalCtrl {
  constructor( Video, FileUploader, AppConstants, $sce) {
    'ngInject';
    var  $ctrl = this
    this._Video = Video
    this.$onInit = function () {
      this._video = this.resolve.video;
      this._s3_url = this.resolve.s3_url;
     };
    this._video_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._uploadInProgress = false
    this._load_save = false
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
      ctrl._Video.update({id: ctrl._video.id, src: ctrl._s3_url.url.replace('https:','')+ '/' + key}).then(function(res){
        ctrl._video.src = res.src;
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
    item.url = this._AppConstants.api + '/admin/videos/'+ this._video.id
    item.alias = 'video[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onSuccess = function(response){
      ctrl._video.cover = response.cover;
      ctrl._uploadInProgress = false
      item.remove();
    }

    item.onCancel = function(response, status, headers){
      ctrl._uploadInProgress = false
    }
    item.upload()
  }

  saveVideo(){
    this._load_save = true
    this._Video.update(this._video).then(
      (res) => {
        this._video = res
        this._showEdit = false
        this._load_save = false
      }
    )
  }

  deleteVideo(){
    this._Video.delete(this._video).then(
      (res) => {
        this.modalInstance.close('delete')
      }
    )
  }
}

let AppHeader = {
  controller: VideoModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'videos/video_modal.html'
};


export default AppHeader;
