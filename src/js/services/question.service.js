export default class Question {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/questions/',
      method: 'GET'
    }).then((res) => res.data);
  }
  getQuestion(id){
    return this._$http({
      url: this._AppConstants.api + '/admin/questions/' + id,
      method: 'GET'
    }).then((res) => res.data);
  }
  update(question){
    return this._$http({
      url: this._AppConstants.api + '/admin/questions/' + question.id+ '/update_question',
      method: 'POST',
      data: question
    }).then((res) => res.data);
  }

  newQuestion(question){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/questions/',
      method: 'POST',
      data: question
    }).then((res) => res.data);
  }
  // Retrieve a user's profile
  // get() {
  //   return this._$http({ 
  //     url: this._AppConstants.api + '/profiles/' + username,
  //     method: 'GET'
  //   }).then((res) => res.data.profile);
  // }


}