export default class Skill {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  all(page, name) {
    if (name){
      var url = this._AppConstants.api + '/admin/skills?page=' + page + '&by_name=' + name
    }else{
      var url = this._AppConstants.api + '/admin/skills?page=' + page
    }

    return this._$http({
      url: url,
      method: 'GET'
    }).then((res) => res.data);
  }

  seen(page, name) {
    if (name){
      var url = this._AppConstants.api + '/admin/skills/seen?page=' + page + '&by_name=' + name
    }else{
      var url = this._AppConstants.api + '/admin/skills/seen?page=' + page
    }

    return this._$http({
      url: url,
      method: 'GET'
    }).then((res) => res.data);
  }

  archived(page, name) {
    if (name){
      var url = this._AppConstants.api + '/admin/skills/archived?page=' + page + '&by_name=' + name
    }else{
      var url = this._AppConstants.api + '/admin/skills/archived?page=' + page
    }

    return this._$http({
      url: url,
      method: 'GET'
    }).then((res) => res.data);
  }

  update(skill){
    return this._$http({
      url: this._AppConstants.api + '/admin/skills/' + skill.id,
      method: 'PUT',
      data: skill
    }).then((res) => res.data);
  }

  delete(skill){
    return this._$http({
      url: this._AppConstants.api + '/admin/skills/' + skill.id,
      method: 'DELETE',
      data: skill
    }).then((res) => res.data);
  }


}
