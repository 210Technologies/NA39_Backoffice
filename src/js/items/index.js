import angular from 'angular';

// Create the settings module where our functionality can attach to
let itemsModule = angular.module('app.items', []);


// Include our UI-Router config settings
import ItemsConfig from './items.config';
itemsModule.config(ItemsConfig);

// Controllers
import ItemsCtrl from './items.controller';
itemsModule.controller('ItemsCtrl', ItemsCtrl);

import appItemModal from './item_modal.component';
itemsModule.component('appItemModal', appItemModal);

import appNewItemModal from './new_item_modal.component';
itemsModule.component('appNewItemModal', appNewItemModal);


export default itemsModule;