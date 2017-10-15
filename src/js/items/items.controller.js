class ItemsCtrl {
  constructor(item_categories, items, Item, ItemCategory, $uibModal, $filter) {
    'ngInject';
    this._items = items
    this._item_categories = item_categories
    this._Item = Item
    this._$uibModal = $uibModal
    this._newCat = false;
    this._new_item_category = {}
    this._ItemCategory = ItemCategory
    this.$_filter = $filter
  }

  itemModal(item){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                
                component: 'appItemModal',
                resolve:{
                    item: function() {
                      return item;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      if (result == 'delete'){
        ctrl._items.splice(ctrl._items.indexOf(item), 1)
      }else{
        ctrl._items[ctrl._items.indexOf(item)] = result
      }
    });
  }

  submitCat(){
    this._ItemCategory.save(this._new_item_category).then(
      (res) => {
        this._item_categories.push(res)
        this._newCat = false;
      },
      (err) => {err.data}
    )
  }

  updateCat(){
    this._ItemCategory.update(this.selected_cat).then(
      (res) => {
        this.selected_cat.edit = false;
      },
      (err) => {err.data}
    )
  }

  deleteCat(category){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return category
            },
            service: function(){
              return ctrl._ItemCategory
            },
            message: function(){
              return 'Delete this category will delete all his items, are you sure?'
            }
        }
   }).result.then(function (result) {
      if (result == 'ok'){
        ctrl._item_categories.splice(ctrl._item_categories.indexOf(category), 1)
        var videos = ctrl.$_filter('filter')(ctrl._items, {category_photo_id: ctrl.selected_cat.id})
        for (var i = videos.length -1; i >= 0; i--)
          ctrl._items.splice(ctrl._items.indexOf(videos[i]),1);
        ctrl.selected_cat = ctrl._item_categories[ctrl._item_categories.length - 1]
      }
      
    });
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