export default class User {
   constructor(JWT, AppConstants, $http, $state, $q, jwtHelper) {
    'ngInject';
    // Object to store our user properties
    console.log(AppConstants.api)
    this._JWT = JWT;
		this._AppConstants = AppConstants;
    this._$http = $http;
		this.current = null;
    this._$state = $state;
    this._$q = $q;
    this._jwtHelper = jwtHelper;
	}
	// Try to authenticate by registering or logging in
  attemptAuth(type, credentials){
    let route = (type === 'login') ? '/user_token' : '/users';
    return this._$http({
      url: this._AppConstants.api + route,
      method: 'POST',
      data: {
        auth: credentials
      }
    }).then(
      // On success...
      (res) => {
        // Set the JWT token
        this._JWT.save(res.data.jwt);
        // Store the user's info for easy lookup
        // this.current = res.data.user;

        return res;
      }
    );
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    // Do a hard reload of current state to ensure all data is flushed
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    // Check for JWT token first
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    // If there's a JWT & user is already set
    if (this.current) {
      deferred.resolve(true);

    // If current user isn't set, get it from the server.
    // If server doesn't 401, set current user & resolve promise.
    } else {
      var tokenPayload = this._jwtHelper.decodeToken(this._JWT.get());
      this._$http({
        url: this._AppConstants.api + '/users/' + tokenPayload.sub,
        method: 'GET',
      }).then(
        (res) => {
          this.current = res.data;
          deferred.resolve(true);
        },
        // If an error happens, that means the user's token was invalid.
        (err) => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
        // Reject automatically handled by auth interceptor
        // Will boot them to homepage
      );
    }

    return deferred.promise;
  }

  ensureAuthIs(bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      // if it's the opposite, redirect home
      if (authValid !== bool) {
        this._$state.go('app.login');
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }
    })

    return deferred.promise;
  }

  // Update the current user's name, email, password, etc
  update(fields) {
    return this._$http({
      url: this._AppConstants.api + '/user',
      method: 'PUT',
      data: { user: fields }
    }).then(
      (res) => {
        this.current = res.data.user;
        return res.data.user;
      }
    );
  }

}