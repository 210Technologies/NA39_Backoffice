import angular from 'angular';

// Create the settings module where our functionality can attach to
let usersModule = angular.module('app.users', []);


// Include our UI-Router config settings
import usersConfig from './users.config';
usersModule.config(usersConfig);

// Controllers
import usersCtrl from './users.controller';
usersModule.controller('UsersCtrl', usersCtrl);

import appUser from './user.controller';
usersModule.controller('UserCtrl', appUser);


export default usersModule;
