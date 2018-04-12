class UsersCtrl {
  constructor(users, Users, $uibModal) {
    'ngInject';
    this._users = users
    this._User = Users
    this._$uibModal = $uibModal
  }

  getPageUsers(){
    let ctrl = this
    this._User.all(this._users.meta.current_page).then(function(res){
      ctrl._users = res
    })
  }

}


export default UsersCtrl;
