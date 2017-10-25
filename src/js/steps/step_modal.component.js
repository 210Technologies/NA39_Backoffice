class StepModalCtrl {
  constructor( Step, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Step = Step
    this.$onInit = function () { 
      this._step = angular.copy(this.resolve.step); 
      this._src_uploader = new FileUploader(({url: AppConstants.api + '/admin/steps/'+ this._step.id, method: 'PUT'}));
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
            item.alias = 'step[cover]'
            $ctrl._cover_error = false
         }else{
          item.alias = 'step[src]'
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
    this._delete_load = false
  }

  saveStep(){
    let ctrl = this
    ctrl._load = true
    
    if (this._src_uploader.queue.length > 0){
      this._src_uploader.formData.concat([{'step[title]': this._step.title}, {'step[description]': this._step.description}, {'step[status]': this._step.status}])
      this._src_uploader.onCompleteItem = function(item, response){
        ctrl._step = response;
        item.remove()
        ctrl._load = false
        ctrl._showEdit = false
      }
      this._src_uploader.uploadAll()
    }else{
      this._Step.update(this._step).then(
        (res) => {
          this._step = res
          this._showEdit = false
          ctrl._load = false
        }
      )
    }
  }

  deleteStep(){
    this._delete_load = true
    this._Step.delete(this._step).then(
      (res) => {
        this.modalInstance.close(['delete', this._step])
      },
      (err) => {
        this._delete_load = false
      }
    )
  }
}

let AppHeader = {
  controller: StepModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'steps/step_modal.html'
};


export default AppHeader;