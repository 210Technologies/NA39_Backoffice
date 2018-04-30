import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

// Services
import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import VideoService from './video.service';
servicesModule.service('Video', VideoService);

import CategoryVideoService from './category_video.service';
servicesModule.service('CategoryVideo', CategoryVideoService);

import PhotoService from './photo.service';
servicesModule.service('Photo', PhotoService);

import CategoryPhotoService from './category_photo.service';
servicesModule.service('CategoryPhoto', CategoryPhotoService);

import ItemService from './item.service';
servicesModule.service('Item', ItemService);

import ItemCategoryService from './item_category.service';
servicesModule.service('ItemCategory', ItemCategoryService);

import ExerciseService from './exercise.service';
servicesModule.service('Exercise', ExerciseService);

import WorkoutService from './workout.service';
servicesModule.service('Workout', WorkoutService);

import UsersService from './users.service';
servicesModule.service('Users', UsersService);

import StepService from './step.service';
servicesModule.service('Step', StepService);

import StepWorkoutService from './step_workout.service';
servicesModule.service('StepWorkout', StepWorkoutService);

import ChallengeService from './challenge.service';
servicesModule.service('Challenge', ChallengeService);

import QuestionService from './question.service';
servicesModule.service('Question', QuestionService);

import NotificationService from './notification.service';
servicesModule.service('Notification', NotificationService);

import SkillService from './skill.service';
servicesModule.service('Skill', SkillService);

export default servicesModule;
