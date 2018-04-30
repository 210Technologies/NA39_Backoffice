import angular from 'angular';

// Create the settings module where our functionality can attach to
let skillsModule = angular.module('app.skills', []);


// Include our UI-Router config settings
import skillsConfig from './skills.config';
skillsModule.config(skillsConfig);

// Controllers
import skillsCtrl from './skills.controller';
skillsModule.controller('SkillsCtrl', skillsCtrl);

// import appSkill from './skill.controller';
// skillsModule.controller('SkillCtrl', appSkill);


export default skillsModule;
