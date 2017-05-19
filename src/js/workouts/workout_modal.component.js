class WorkoutModalCtrl {
  constructor( Workout, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Workout = Workout
    this.$onInit = function () { this._workout = this.resolve.workout; };
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    
  }

  edit(){
    this._showEdit = true
  }

  uploadCover(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/admin/workouts/'+ this._workout.id
    item.alias = 'workout[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._workout = response;
    }
    item.upload()
  }

}

let AppHeader = {
  controller: WorkoutModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'workouts/workout_modal.html'
};


export default AppHeader;