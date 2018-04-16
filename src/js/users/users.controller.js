class UsersCtrl {
  constructor(users, Users, $uibModal) {
    'ngInject';
    this._users = users
    this._User = Users
    this._$uibModal = $uibModal
    this.search = ''
    this.load = false
  }

  getPageUsers(){
    this.load = true
    let ctrl = this
    this._User.all(this._users.meta.current_page).then(function(res){
      ctrl._users = res
      ctrl.load = false
    })
  }

  searchByName(){
    this.load = true
    let ctrl = this
    this._User.all(null, this.search).then(function(res){
      ctrl._users = res
      ctrl.load = false
    })
  }

}


export default UsersCtrl;
