import angular from 'angular';

// Create the settings module where our functionality can attach to
let workoutsModule = angular.module('app.workouts', []);


// Include our UI-Router config settings
import workoutsConfig from './workouts.config';
workoutsModule.config(workoutsConfig);

// Controllers
import workoutsCtrl from './workouts.controller';
workoutsModule.controller('WorkoutsCtrl', workoutsCtrl);

import appWorkoutModal from './workout.controller';
workoutsModule.controller('WorkoutCtrl', appWorkoutModal);

import appNewWorkoutModal from './new_workout_modal.component';
workoutsModule.component('appNewWorkoutModal', appNewWorkoutModal);


export default workoutsModule;