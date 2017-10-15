class ChallengeCtrl {
  constructor(challenge, Challenge, $uibModal) {
    'ngInject';
    var  $ctrl = this
    this._challenge = challenge
    this._Challenge = Challenge
    this._showEdit = false
    this._$uibModal = $uibModal
    
  }

  challengeModal(){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
                component: 'appChallengeModal',
                resolve:{
                    challenge: function() {
                      return ctrl._challenge;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      // ctrl._challenge = result
    });
  }

  newQuestionModal(){
    let ctrl = this
    var modalInstance = this._$uibModal.open({ component: 'appNewQuestionModal',
                              resolve:{
                    challenge: function() {
                      return ctrl._challenge;
                    }
                } })
    modalInstance.result.then(function (result) {
      ctrl._challenge.questions.push(result)
    });
  }

  QuestionModal(question){
    let ctrl = this
    var modalInstance = this._$uibModal.open({ component: 'appQuestionModal',
                              resolve:{
                    question: function() {
                      return question;
                    }
                } })
    modalInstance.result.then(function (result) {
      question = result
    });
  }

}

export default ChallengeCtrl;