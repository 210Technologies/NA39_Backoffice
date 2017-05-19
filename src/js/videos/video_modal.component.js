class VideoModalCtrl {
  constructor( Video, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Video = Video
    this.$onInit = function () { this._video = this.resolve.video; };
    this._video_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._video_uploader.onAfterAddingFile = function(item){
    }
    this._showEdit = false
    
  }

  edit(){
    this._showEdit = true
  }
  uploadVideo(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/admin/videos/'+ this._video.id
    item.alias = 'video[src]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._video = response;
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
    item.onComplete = function(response){
      ctrl._video = response;
    }
    item.upload()
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