class VideosCtrl {
  constructor(category_videos, videos, Video, $uibModal) {
    'ngInject';
    this._videos = videos
    this._category_videos = category_videos
    this._Video = Video
    this._$uibModal = $uibModal
    this._newCat = false;
    this._new_category_video = {}
    // Bind is req'd because the logout method assumes
    // the execution context is within the User object.
    // this.logout = User.logout.bind(User); 
  }

  videoModal(video){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                
                component: 'appVideoModal',
                resolve:{
                    video: function() {
                      return video;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      ctrl._videos[ctrl._videos.indexOf(video)] = result
    });
  }

  submitCat(){
    this._Video.newCat(this._new_category_video).then(
      (res) => {
        this._category_videos.push(res)
        this._newCat = false;
      },
      (err) => {err.data}
    )
  }

  newVideoModal(category){
    let ctrl = this._videos
    var modalInstance = this._$uibModal.open({
        component: 'appNewVideoModal',
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


export default VideosCtrl;