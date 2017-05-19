import angular from 'angular';

// Create the settings module where our functionality can attach to
let photosModule = angular.module('app.photos', []);


// Include our UI-Router config settings
import photosConfig from './photos.config';
photosModule.config(photosConfig);

// Controllers
import photosCtrl from './photos.controller';
photosModule.controller('PhotosCtrl', photosCtrl);

import appPhotoModal from './photo_modal.component';
photosModule.component('appPhotoModal', appPhotoModal);

import appNewPhotoModal from './new_photo_modal.component';
photosModule.component('appNewPhotoModal', appNewPhotoModal);


export default photosModule;