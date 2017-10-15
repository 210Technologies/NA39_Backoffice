class QuestionModalCtrl {
  constructor(Question, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Question = Question
    this._cover_uploader = new FileUploader();
    this.$onInit = function () { 
      this._question = this.resolve.question; 
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
  controller: QuestionModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'challenges/question_modal.html'
};


export default AppNewExercise;
