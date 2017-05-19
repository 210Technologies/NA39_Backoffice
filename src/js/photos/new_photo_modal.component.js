class NewPhotoModalCtrl {
  constructor(Photo, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Photo = Photo
    this.$onInit = function () { this._category = this.resolve.category; };
    this._photo_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._new_photo = {}
    
  }

  savePhoto(){
    let ctrl = this
    var item = this._photo_uploader.queue[0]
    item.url =  this._AppConstants.api + '/admin/photos'
    item.formData.push({'photo[title]': this._new_photo.title})
    item.formData.push({'photo[category_photo_id]': this._category.id})
    item.formData.push({'photo[description]': this._new_photo.description})
    item.alias = 'photo[src]'
    item.method = 'POST'
    
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response, video){
      ctrl._new_photo = response;
    }
    item.upload()
  	
  }
}

let AppNewPhoto = {
  controller: NewPhotoModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'photos/new_photo_modal.html'
};


export default AppNewPhoto;
