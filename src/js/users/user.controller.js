class UserCtrl {
  constructor(user, Users, $uibModal, $state) {
    'ngInject';
    this._user = user
    this._User = Users
    this._$state = $state
    this._$uibModal = $uibModal
    this._show_video = $state.params.show_video
    console.log($state.params)
    let ctrl = this
    this._User.getWorkouts(this._user.id).then(function(res){
      ctrl._user.user_workouts = res
    })
    if (this._show_video){
      this.getVideos()
    }
  }

  getVideos(){
    let ctrl = this
    if (!ctrl._user.skills){
      this._User.getSkills(this._user.id).then(function(res){
        ctrl._user.skills = res
      })
    }

  }

  deleteUser(){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return ctrl._user
            },
            service: function(){
              return ctrl._User
            },
            message: function(){
              return 'Are you sure?'
            }
        }
   }).result.then(function (result) {
      if (result == 'ok'){
        ctrl._$state.go('app.users')
      }
    });
  }

}


export default UserCtrl;
