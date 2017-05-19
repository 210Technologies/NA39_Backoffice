class PhotosCtrl {
  constructor(category_photos, photos, $state, Photo, $uibModal, CategoryPhoto) {
    'ngInject';
    this._$state = $state;
    this._photos = photos
    this._category_photos = category_photos
    this._Photo = Photo
    this._CategoryPhoto = CategoryPhoto
    this._$uibModal = $uibModal
    this._newCat = false;
    this._new_category_photo = {}
    this._selected_cat = undefined
    this._selected_cat_ids = []
  }
  
  photosCategory(category){
    this._selected_cat = category
    // if (this._selected_cat_ids.indexOf(category.id) == -1){
    //   console.log(this._photos)
    //   this._CategoryPhoto.getPhotos(category.id).then(
    //     (res) => {
    //       $.merge(this._photos, res.photos)
    //       this._selected_cat_ids.push(category.id)
    //     },
    //     (err) => {}
    //   )

    // }
    
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
    this._Photo.newCat(this._new_category_photo).then(
      (res) => {
        this._category_photos.push(res)
        this._newCat = false;
      },
      (err) => {err.data}
    )
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