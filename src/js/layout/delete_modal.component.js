class DeleteModalCtrl {
  constructor(AppConstants) {
    'ngInject';
    var  $ctrl = this
    this.$onInit = function () { 
      this._item = this.resolve.item;
      this._service = this.resolve.service;
      this._message = this.resolve.message;
    };
    this._AppConstants = AppConstants;
    this._load = false
  }

  confirm(){
    this._load = true
    this._service.delete(this._item).then(
      (res) => {
        this.modalInstance.close('ok')
      },
      (err) => {err.data}
    )
  }
}

let AppHeader = {
  controller: DeleteModalCtrl,
  bindings: {
    modalInstance: '<',
    resolve: '<'
  },
  templateUrl: 'layout/delete_modal.html'
};


export default AppHeader;