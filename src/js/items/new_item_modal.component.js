class NewItemModalCtrl {
  constructor(Item, FileUploader, AppConstants) {
  	'ngInject';
  	let $ctrl = this;
    this._Item = Item
    this.$onInit = function () { this._category = this.resolve.category; };
    this._item_uploader = new FileUploader();
    this._AppConstants = AppConstants;
    this._showEdit = false
    this._new_item = {}
    
  }

  saveItem(){
    let ctrl = this
    var item = this._item_uploader.queue[0]
    item.url =  this._AppConstants.api + '/admin/items'
    item.formData.push({'item[name]': this._new_item.name})
    item.formData.push({'item[item_category_id]': this._category.id})
    item.formData.push({'item[description]': this._new_item.description})
    item.formData.push({'item[link]': this._new_item.link})
    item.formData.push({'item[status]': this._new_item.status})
    item.alias = 'item[src]'
    item.method = 'POST'
    
    item.onProgress = function(progress){
      item.progress = progress
    }
    item.onComplete = function(response, video){
      ctrl.modalInstance.close(response)
    }
    item.upload()
    
  }
}

let AppNewVideo = {
  controller: NewItemModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '='
  },
  templateUrl: 'items/new_item_modal.html'
};


export default AppNewVideo;
