function ItemsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.items', {
    url: '/items',
    controller: 'ItemsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'items/items.html',
    title: 'Items',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      items: function(Item, $state, $stateParams) {
        return Item.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      },
      item_categories: function(ItemCategory, $state, $stateParams) {
        return ItemCategory.all().then(
          (profile) => profile,
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default ItemsConfig;