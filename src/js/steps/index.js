import angular from 'angular';

// Create the settings module where our functionality can attach to
let stepsModule = angular.module('app.steps', []);


import appNewStepModal from './new_step_modal.component';
stepsModule.component('appNewStepModal', appNewStepModal);

import appStepModal from './step_modal.component';
stepsModule.component('appStepModal', appStepModal);

export default stepsModule;