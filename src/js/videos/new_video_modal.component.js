class NewVideoModalCtrl {
  constructor(Video, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Video = Video
    this.$onInit = function () { this._category = this.resolve.category; };
    this._video_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._new_video = {}
    this.step = 1
    
  }

  firstStep(){
  	this._new_video.category_video_id = this._category.id
  	this._Video.newVideo(this._new_video).then(
  		(res) => {
  			this._new_video = res
  			$('.tab-pane').hide()
		  	$('#step-2').show()
		  	$('li').removeClass('active')
		  	$('li#link-2').addClass('active')
        this.step = 2
  		}
  	)
  }

  secondStep(){
    if (!this.src_set){return}
    $('.tab-pane').hide()
    $('#step-3').show()
    $('li').removeClass('active')
    $('li#link-3').addClass('active')
    this.step = 3
  }

  thirdStep(){
    if (!this.cover_set){return}
    $('.tab-pane').hide()
    $('#step-4').show()
    $('li').removeClass('active')
    $('li#link-4').addClass('active')
    this.step = 4
  }

  fourthStep(){
    this._Video.update(this._new_video).then(
      (res) => {
        this.modalInstance.close(res)
      }
    )
  }

  uploadVideo(item) {
  	let ctrl = this
    item.url = this._AppConstants.api + '/admin/videos/'+ this._new_video.id
    item.alias = 'video[src]'
    item.method = 'PUT'
    item.formData = this._new_video
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response, video){
      ctrl._new_video = response;
      ctrl.src_set = true
    }
	  item.upload()
  }

  uploadCover(item) {
  	let ctrl = this
    item.url = this._AppConstants.api + '/admin/videos/'+ this._new_video.id
    item.alias = 'video[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._new_video = response;
      ctrl.cover_set = true
    }
    item.upload()
  }
}

let AppNewVideo = {
  controller: NewVideoModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'videos/new_video_modal.html'
};


export default AppNewVideo;
