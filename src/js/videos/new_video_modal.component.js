class NewVideoModalCtrl {
  constructor(Video, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Video = Video
    this.$onInit = function () { this._category = this.resolve.category; };
    this._file_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._new_video = {}
    this.step = 1
    
  }

  firstStep(form){
    form.$submitted = true
    if (form.$invalid){return}
  	this._new_video.category_video_id = this._category.id
    this.load = true
  	this._Video.newVideo(this._new_video).then(
  		(res) => {
  			this._new_video = res
  			$('.tab-pane').hide()
		  	$('#step-2').show()
		  	$('li').removeClass('active')
		  	$('li#link-2').addClass('active')
        this.step = 2
        this.load = false
  		}
  	)
  }

  // secondStep(){
  //   if (!this._file_uploader.queue[0]){return}
  //   $('.tab-pane').hide()
  //   $('#step-3').show()
  //   $('li').removeClass('active')
  //   $('li#link-3').addClass('active')
  //   this.step = 3
  // }

  // thirdStep(){
  //   if (!this._file_uploader.queue[1]){return}
  //   $('.tab-pane').hide()
  //   $('#step-4').show()
  //   $('li').removeClass('active')
  //   $('li#link-4').addClass('active')
  //   this.step = 4
  // }

  fourthStep(){
    this._Video.update({id: this._new_video.id, status: this._new_video.status}).then(
      (res) => {
        this.modalInstance.close(res)
      }
    )
  }

  secondStep(item) {
  	this.uploadFile(item, this._AppConstants.api + '/admin/videos/'+ this._new_video.id, 'video[src]', 'PUT')
  }

  thirdStep(item) {
  	this.uploadFile(item, this._AppConstants.api + '/admin/videos/'+ this._new_video.id, 'video[cover]', 'PUT')
  }

  uploadFile(item, url, alias, method){
    let ctrl = this
    item.url = url
    item.alias = alias
    item.method = method
    item.onProgress = function(progress){
      item.progress = progress
      if (item.progress == 100){
        ctrl.load = true
      }
    }
    item.onComplete = function(response, video){
      ctrl._new_video = response;
      $('.tab-pane').hide()
      $('#step-' + (ctrl.step + 1)).show()
      $('li').removeClass('active')
      $('li#link-' + (ctrl.step + 1)).addClass('active')
      ctrl.step += 1
      ctrl.load = false
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
