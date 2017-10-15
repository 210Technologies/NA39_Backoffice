class PhotoModalCtrl {
  constructor( Photo, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Photo = Photo
    this.$onInit = function () { this._photo = this.resolve.photo; };
    this._photo_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._photo_uploader.onAfterAddingFile = function(item){
    }
    this._showEdit = false
    
  }

  edit(){
    this._showEdit = true
  }

  getDate(date){
    var d = new Date(date)
    function pad(s) { return (s < 10) ? '0' + s : s; }
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

  uploadPhoto(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/admin/photos/'+ this._photo.id
    item.alias = 'photo[src]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._photo = response;
      // this.remove()
    }
    item.upload()
  }

  deletePhoto(){
    this._Photo.delete(this._photo).then(
      (res) => {
        this.modalInstance.close('delete')
      },
      (err) => {
        this._showEdit = false
      }
    )
  }

  savePhoto(){
    this._Photo.update(this._photo).then(
      (res) => {
        this._showEdit = false
      },
      (err) => {
        this._showEdit = false
      }
    )
  }

}

let AppHeader = {
  controller: PhotoModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'photos/photo_modal.html'
};


export default AppHeader;