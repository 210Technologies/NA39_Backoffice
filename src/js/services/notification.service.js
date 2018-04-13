export default class Notification {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  unread() {
    return this._$http({
      url: this._AppConstants.api + '/admin/notifications/unread',
      method: 'GET'
    }).then((res) => res.data);
  }

  update(notification) {
    return this._$http({
      url: this._AppConstants.api + '/admin/notifications/'+ notification.id,
      method: 'PUT',
      data: notification
    }).then((res) => res.data);
  }


}
