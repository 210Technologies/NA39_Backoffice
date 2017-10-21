class ItemModalCtrl {
  constructor( Item, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Item = Item
    this.$onInit = function () { this._item = this.resolve.item; };
    this._item_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
  }

  uploadItem(item) {
    let ctrl = this
    item.url = this._AppConstants.api + 'admin/items/'+ this._item.id
    item.alias = 'item[src]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._item = response;
    }
    item.upload()
  }

  updateItem(){
    this._Item.update(this._item).then(
      (res) => {
        this._showEdit = false
      }
    )
  }

  deleteItem(){
    this._Item.delete(this._item).then(
      (res) => {
        this.modalInstance.close('delete')
      }
    )
  }
}

let AppHeader = {
  controller: ItemModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'items/item_modal.html'
};


export default AppHeader;