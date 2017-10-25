import angular from 'angular';

// Create the settings module where our functionality can attach to
let workoutsModule = angular.module('app.workouts', []);


// Include our UI-Router config settings
import workoutsConfig from './workouts.config';
workoutsModule.config(workoutsConfig);

// Controllers
import workoutsCtrl from './workouts.controller';
workoutsModule.controller('WorkoutsCtrl', workoutsCtrl);

import appWorkout from './workout.controller';
workoutsModule.controller('WorkoutCtrl', appWorkout);

import appNewWorkoutModal from './new_workout_modal.component';
workoutsModule.component('appNewWorkoutModal', appNewWorkoutModal);

import appWorkoutModal from './workout_modal.component';
workoutsModule.component('appWorkoutModal', appWorkoutModal);

export default workoutsModule;