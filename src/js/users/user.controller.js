class UserCtrl {
  constructor(user, Users, $uibModal) {
    'ngInject';
    this._user = user
    this._User = Users
    this._$uibModal = $uibModal
    console.log(user)
  }

  getVideos(){
    let ctrl = this
    this._User.getSkills(this._user.id).then(function(res){
      ctrl._user.skills = res
    })
  }

}


export default UserCtrl;
