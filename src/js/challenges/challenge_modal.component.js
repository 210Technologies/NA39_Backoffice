class ChallengeModalCtrl {
  constructor(Challenge, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this.$onInit = function () { this._challenge = this.resolve.challenge; };
    this._Challenge = Challenge
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    
  }

  saveChallenge(){
    let ctrl = this
    var item = this._cover_uploader.queue[0]
    item.url =  this._AppConstants.api + '/admin/category_questions/' + this._challenge.id
    item.formData.push({'category_question[name]': this._challenge.name})
    item.formData.push({'category_question[description]': this._challenge.description})
    item.alias = 'category_question[cover]'
    item.method = 'PUT'
    
    item.onProgress = function(progress){
      item.progress = progress
      if (progress == 100)
        ctrl._load = true
    }
    item.onComplete = function(response, video){
      ctrl._load = false
      ctrl._challenge = response;
      ctrl.modalInstance.close(response)
    }
    item.upload()
    
  }
}

let AppNewExercise = {
  controller: ChallengeModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'challenges/challenge_modal.html'
};


export default AppNewExercise;
