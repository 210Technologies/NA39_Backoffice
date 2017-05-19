import angular from 'angular';

// Create the settings module where our functionality can attach to
let exercisesModule = angular.module('app.exercises', []);


// Include our UI-Router config settings
import exercisesConfig from './exercises.config';
exercisesModule.config(exercisesConfig);

// Controllers
import exercisesCtrl from './exercises.controller';
exercisesModule.controller('ExercisesCtrl', exercisesCtrl);

import appExerciseModal from './exercise_modal.component';
exercisesModule.component('appExerciseModal', appExerciseModal);

import appNewExerciseModal from './new_exercise_modal.component';
exercisesModule.component('appNewExerciseModal', appNewExerciseModal);


export default exercisesModule;