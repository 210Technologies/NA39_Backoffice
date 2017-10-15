export default class Challenge {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all() {
    return this._$http({ 
      url: this._AppConstants.api + '/admin/category_questions/',
      method: 'GET'
    }).then((res) => res.data);
  }
  getChallenge(id){
    return this._$http({
      url: this._AppConstants.api + '/admin/category_questions/' + id,
      method: 'GET'
    }).then((res) => res.data);
  }
  update(challenge){
    return this._$http({
      url: this._AppConstants.api + '/admin/category_questions/' + challenge.id+ '/update_challenge',
      method: 'POST',
      data: challenge
    }).then((res) => res.data);
  }

  newChallenge(challenge){
    return this._$http({ 
      url: this._AppConstants.api + '/admin/challenge/',
      method: 'POST',
      data: challenge
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