class PhotosCtrl {
  constructor(category_photos, photos, $state, Photo, $uibModal, CategoryPhoto, $filter) {
    'ngInject';
    this._$state = $state;
    this._photos = photos
    this._category_photos = category_photos
    this._Photo = Photo
    this._CategoryPhoto = CategoryPhoto
    this._$uibModal = $uibModal
    this._newCat = false;
    this._new_category_photo = {}
    this.$_filter = $filter
  }
  photoModal(photo){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                component: 'appPhotoModal',
                resolve:{
                    photo: function() {
                      return photo;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      ctrl._photos[ctrl._photos.indexOf(photo)] = result
    });
  }

  submitCat(){
    this._CategoryPhoto.save(this._new_category_photo).then(
      (res) => {
        this._category_photos.push(res)
        this._newCat = false;
      },
      (err) => {err.data}
    )
  }

  updateCat(){
    this._CategoryPhoto.update(this._selected_cat).then(
      (res) => {
        this._selected_cat.edit = false;
      },
      (err) => {err.data}
    )
  }

  deleteCat(category){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return category
            },
            service: function(){
              return ctrl._CategoryPhoto
            },
            message: function(){
              return 'Delete this category will delete all his photos, are you sure?'
            }
        }
   }).result.then(function (result) {
      if (result == 'ok'){
        ctrl._category_photos.splice(ctrl._category_photos.indexOf(category), 1)
        var videos = ctrl.$_filter('filter')(ctrl._photos, {category_photo_id: ctrl._selected_cat.id})
        for (var i = videos.length -1; i >= 0; i--)
          ctrl._photos.splice(ctrl._photos.indexOf(videos[i]),1);
        ctrl._selected_cat = ctrl._category_photos[ctrl._category_photos.length - 1]
      }
      
    });
  }

  newPhotoModal(category){
    let ctrl = this._photos
    var modalInstance = this._$uibModal.open({
        component: 'appNewPhotoModal',
        resolve:{
            category: function() {
              return category;
            }
        }
        
   }).result.then(function (result) {
      
      ctrl.push(result)
    });
  }

}


export default PhotosCtrl;