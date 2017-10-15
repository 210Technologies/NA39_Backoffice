import angular from 'angular';

// Create the settings module where our functionality can attach to
let challengesModule = angular.module('app.challenges', []);


// Include our UI-Router config settings
import challengeConfig from './challenges.config';
challengesModule.config(challengeConfig);

// Controllers
import challengesCtrl from './challenges.controller';
challengesModule.controller('ChallengesCtrl', challengesCtrl);

import appChallengeModal from './challenge.controller';
challengesModule.controller('ChallengeCtrl', appChallengeModal);

import appNewChallengeModal from './new_challenge_modal.component';
challengesModule.component('appNewChallengeModal', appNewChallengeModal);

import apppChallengeModal from './challenge_modal.component';
challengesModule.component('appChallengeModal', apppChallengeModal);

import appNewQuestionModal from './new_question_modal.component';
challengesModule.component('appNewQuestionModal', appNewQuestionModal);

import appQuestionModal from './question_modal.component';
challengesModule.component('appQuestionModal', appQuestionModal);


export default challengesModule;