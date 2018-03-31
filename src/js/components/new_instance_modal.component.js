class NewInstanceModalCtrl {
  constructor(FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this.$onInit = function () {
      this._s3_url = this.resolve.s3_url;
      this._Service = this.resolve.service;
      this._instance_name = this.resolve.item_name;
      if (this.resolve.category){
        this._new_instance = {category_video_id: this.resolve.category.id}
      }else{
        this._new_instance = {}
      }
    };
    this._file_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this.step = 1
  }

  enableFinish(){
    if (this.step == 4){return}
    this.step += 1
  }
  back(){
    this.step -= 1
    $('.tab-pane').hide()
    $('#step-' + (this.step)).show()
    $('li').removeClass('active')
    $('li#link-' + (this.step)).addClass('active')

  }
  firstStep(form){
    form.$submitted = true
    if (form.$invalid){return}
    this.load = true
  	this._Service.save(this._new_instance).then(
  		(res) => {
  			this._new_instance = res
  			$('.tab-pane').hide()
		  	$('#step-2').show()
		  	$('li').removeClass('active')
		  	$('li#link-2').addClass('active')
        this.step = 2
        this.load = false
  		}
  	)
  }

  fourthStep(){
    this._Service.update({id: this._new_instance.id, status: this._new_instance.status}).then(
      (res) => {
        this.modalInstance.close(res)
      }
    )
  }

  secondStep(item) {
  	this.uploadVideo(item, this._AppConstants.api + '/admin/'+ this._instance_name +'s/'+ this._new_instance.id, this._instance_name +'[src]', 'PUT')
  }

  thirdStep(item) {
  	this.uploadFile(item, this._AppConstants.api + '/admin/'+ this._instance_name +'s/'+ this._new_instance.id, this._instance_name +'[cover]', 'PUT')
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
      ctrl._new_instance = response;
      $('.tab-pane').hide()
      $('#step-' + (ctrl.step + 1)).show()
      $('li').removeClass('active')
      $('li#link-' + (ctrl.step + 1)).addClass('active')
      ctrl.step += 1
      ctrl.load = false
    }
    item.upload()
  }

  uploadVideo(item, url, alias, method){
    let ctrl = this
    item.url = this._s3_url.url;
    item.formData.push({'key': this._s3_url.fields.key})
    item.formData.push({'success_action_status': this._s3_url.fields.success_action_status})
    item.formData.push({'acl': this._s3_url.fields.acl})
    item.method = 'POST'
    item.onProgress = function(progress){
      item.progress = progress
      if (item.progress == 100){
        ctrl.load = true
      }
    }

    item.onComplete = function(response, video){
      var key = $($.parseXML(response)).find('Key').text()
      ctrl._Service.update({id: ctrl._new_instance.id, src: ctrl._s3_url.url + '/' + key}).then(function(res){
        ctrl._new_instance = res;
        $('.tab-pane').hide()
        $('#step-' + (ctrl.step + 1)).show()
        $('li').removeClass('active')
        $('li#link-' + (ctrl.step + 1)).addClass('active')
        ctrl.step += 1
        ctrl.load = false
      })
    }

    item.upload()
  }

}

let AppNewVideo = {
  controller: NewInstanceModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'components/new_instance_modal.html'
};


export default AppNewVideo;
