class ChallengesCtrl {
  constructor(challenges, Challenge, $uibModal) {
    'ngInject';
    this._challenges = challenges
    this._Challenge = Challenge
    this._$uibModal = $uibModal
    this._newCat = false
    // Bind is req'd because the logout method assumes
    // the execution context is within the User object.
    // this.logout = User.logout.bind(User); 
  }

  newChallengeModal(){
    let ctrl = this._challenges
    var modalInstance = this._$uibModal.open({
        component: 'appNewChallengeModal'
   }).result.then(function (result) {
      if (result != 'cancel')
        ctrl.push(result)
    });
  }

}


export default ChallengesCtrl;