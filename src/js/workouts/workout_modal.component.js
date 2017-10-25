class WorkoutModalCtrl {
  constructor( Workout, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Workout = Workout
    this.$onInit = function () { this._workout = angular.copy(this.resolve.workout); };
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._load = false 
  }
  saveWorkout(){
    let ctrl = this
    ctrl._load = true
    var item = this._cover_uploader.queue[0]
    if (item){
      item.formData.push({'workout[title]': this._workout.title})
      item.formData.push({'workout[description]': this._workout.description})
      item.formData.push({'workout[status]': this._workout.status})
      item.url = this._AppConstants.api + '/admin/workouts/'+ this._workout.id
      item.method = 'PUT'
      item.alias = 'workout[cover]'
      item.onComplete = function(response){
        ctrl.modalInstance.close(['save', response])
      }
      item.upload()
    }else{
      this._Workout.update(this._workout).then(
        (res) => {
          this.modalInstance.close(['save', res])
        }
      )
    }
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