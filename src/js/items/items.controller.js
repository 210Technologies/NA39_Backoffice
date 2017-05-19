class ItemsCtrl {
  constructor(item_categories, items, Item, $uibModal) {
    'ngInject';
    this._items = items
    this._item_categories = item_categories
    this._Item = Item
    this._$uibModal = $uibModal
    this._newCat = false;
    this._new_item_category = {}
    // Bind is req'd because the logout method assumes
    // the execution context is within the User object.
    // this.logout = User.logout.bind(User); 
  }

  videoModal(items){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                
                component: 'appItemModal',
                resolve:{
                    items: function() {
                      return items;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      ctrl._items[ctrl._items.indexOf(items)] = result
    });
  }

  submitCat(){
    this._Item.newCat(this._new_item_category).then(
      (res) => {
        this._item_categories.push(res)
        this._newCat = false;
      },
      (err) => {err.data}
    )
  }

  newItemModal(category){
    let ctrl = this._items
    var modalInstance = this._$uibModal.open({
        component: 'appNewItemModal',
        resolve:{
            category: function() {
              return category;
            }
        }
        
   }).result.then(function (result) {
      
      ctrl.push(result)
    });
  }

}


export default ItemsCtrl;