import angular from 'angular';

// Create the settings module where our functionality can attach to
let stepsModule = angular.module('app.steps', []);

// Include our UI-Router config settings
import stepsConfig from './steps.config';
stepsModule.config(stepsConfig);

// Controllers
import stepsCtrl from './steps.controller';
stepsModule.controller('StepsCtrl', stepsCtrl);

import appNewStepModal from './new_step_modal.component';
stepsModule.component('appNewStepModal', appNewStepModal);

import appStepModal from './step_modal.component';
stepsModule.component('appStepModal', appStepModal);

export default stepsModule;