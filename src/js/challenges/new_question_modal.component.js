class NewQuestionModalCtrl {
  constructor(Question, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Question = Question
    this._cover_uploader = new FileUploader();
    this.$onInit = function () { 
      this._challenge = this.resolve.challenge; 
      this._new_question = {category_question_id: this._challenge.id}
    };
    this._AppConstants = AppConstants;
    this._showEdit = false
    
    
  }

  saveQuestion(){
    this._Question.newQuestion(this._new_question).then(
      (res) => {
        this._new_question = res
      }
    )
  }
}

let AppNewExercise = {
  controller: NewQuestionModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'challenges/new_question_modal.html'
};


export default AppNewExercise;
