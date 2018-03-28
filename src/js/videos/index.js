import angular from 'angular';

// Create the settings module where our functionality can attach to
let videosModule = angular.module('app.videos', []);


// Include our UI-Router config settings
import VideosConfig from './videos.config';
videosModule.config(VideosConfig);

// Controllers
import VideosCtrl from './videos.controller';
videosModule.controller('VideosCtrl', VideosCtrl);

import appVideoModal from './video_modal.component';
videosModule.component('appVideoModal', appVideoModal);



export default videosModule;
