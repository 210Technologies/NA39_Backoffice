class ItemModalCtrl {
  constructor( Item, FileUploader, AppConstants) {
    'ngInject';
    var  $ctrl = this
    this._Item = Item
    this.$onInit = function () { this._item = this.resolve.item; };
    this._item_uploader = new FileUploader();
    this._cover_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._item_uploader.onAfterAddingFile = function(item){
    }
    this._showEdit = false
    
  }

  edit(){
    this._showEdit = true
  }
  uploadItem(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/items/'+ this._item.id
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

  uploadCover(item) {
    let ctrl = this
    item.url = this._AppConstants.api + '/items/'+ this._item.id
    item.alias = 'item[cover]'
    item.method = 'PUT'
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response){
      ctrl._item = response;
    }
    item.upload()
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