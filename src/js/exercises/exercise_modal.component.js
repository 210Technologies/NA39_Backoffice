class ExerciseModalCtrl {
  constructor( Exercise, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Exercise = Exercise
    this.$onInit = function () { 
      this._exercise = this.resolve.exercise;
      this._src_uploader = new FileUploader({url: AppConstants.api + '/admin/exercises/'+ this._exercise.id, method: 'PUT'});
      this._src_uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) != -1;
        }
      });
      this._src_uploader.filters.push({
          name: 'videoFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|mp4|'.indexOf(type) !== -1;
          }
      });
      this._src_uploader.onAfterAddingFile = function(item){
         var type = '|' + item.file.type.slice(item.file.type.lastIndexOf('/') + 1) + '|';
         if ('|jpg|png|jpeg|bmp|gif|'.indexOf(type) != -1){
            item.alias = 'exercise[cover]'
            $ctrl._cover_error = false
         }else{
          item.alias = 'exercise[src]'
          $ctrl._src_error = false
         }
      }
      this._src_uploader.onWhenAddingFileFailed = function(item, filter){
        if (filter.name == 'imageFilter'){
          $ctrl._cover_error = true
        }else{
          $ctrl._src_error = true
        }
      }
    };
    
    this._showEdit = false
    this._load = false
    
  }

  saveExercise(){
    this._load = true
    let ctrl = this
    if (this._src_uploader.queue.length > 0){
      this._src_uploader.formData.concat([{'exercise[title]': this._exercise.title}, {'exercise[description]': this._exercise.description}, {'exercise[status]': this._exercise.status}])
      this._src_uploader.onCompleteItem = function(item, response){
        ctrl._exercise = response;
        item.remove()
        ctrl._load = false
        ctrl._showEdit = false
      }
      this._src_uploader.uploadAll()
    }else{
      this._Exercise.update(this._exercise).then(
        (res) => {
          this._exercise = res
          this._showEdit = false
          ctrl._load = false
        }
      )
    }
  }
  deleteExercise(){
    this._Exercise.delete(this._exercise).then(
      (res) => {
        this.modalInstance.close('delete')
      }
    )
  }
}

let AppHeader = {
  controller: ExerciseModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'exercises/exercise_modal.html'
};


export default AppHeader;