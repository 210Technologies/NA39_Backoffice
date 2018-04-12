class StepsCtrl {
  constructor(steps, Step, $uibModal) {
    'ngInject';
    var  $ctrl = this
    this._Step = Step
    this._steps = steps
    this._$uibModal = $uibModal
  }

  stepModal(step){
    let ctrl = this
    this._Step.edit(step).then(
      (res) =>{
        var modalInstance = this._$uibModal.open({
            component: 'appStepModal',
            backdrop: 'static',
            resolve:{
                step: function() {
                  return step;
                },
                s3_url: function(){
                  return res;
                }
            }

         })
        modalInstance.result.then(function (result) {
          if (result == 'delete'){
            ctrl._steps.splice(ctrl._steps.indexOf(step), 1)
          }
        });
      }
    )

  }

  newStep(){
    let ctrl = this
    this._Step.new().then(
      (res) =>{
        var modalInstance = this._$uibModal.open({
            component: 'appNewInstanceModal',
            backdrop: 'static',
            resolve:{
                s3_url: function(){
                  return res;
                },
                service: function(){
                  return ctrl._Step;
                },
                item_name: function(){
                  return 'step';
                }
            }
        })
        modalInstance.result.then(function (result) {
          ctrl._steps.push(result)
        });
      }
    )
  }

  deleteStep(){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return ctrl._step
            },
            service: function(){
              return ctrl._Step
            },
            message: function(){
              return 'Delete this step will it on all workouts, are you sure?'
            }
        }
   }).result.then(function (result) {
      // if (result == 'ok'){
      //   ctrl._steps.splice(ctrl._steps.indexOf(result), 1)
      //   var videos = ctrl.$_filter('filter')(ctrl._videos, {category_video_id: ctrl.selected_cat.id})
      //   for (var i = videos.length -1; i >= 0; i--)
      //     ctrl._videos.splice(ctrl._videos.indexOf(videos[i]),1);
      //   ctrl.selected_cat = ctrl._steps[ctrl._steps.length - 1]
      // }

    });
  }

}

export default StepsCtrl;
