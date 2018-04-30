class SkillsCtrl {
  constructor(skills, Skill, $uibModal) {
    'ngInject';
    this._skills = skills
    this._Skill = Skill
    this._$uibModal = $uibModal
    this.search = ''
    this.load = false
  }
  newVideos(){
    this.load = true
    let ctrl = this
    this._Skill.all(1).then(function(res){
      ctrl._skills = res
      ctrl.load = false
    })
  }
  seenVideos(){
    this.load = true
    let ctrl = this
    this._Skill.seen(1).then(function(res){
      ctrl._skills = res
      ctrl.load = false
    })
  }

  archivedVideos(){
    this.load = true
    let ctrl = this
    this._Skill.archived(1).then(function(res){
      ctrl._skills = res
      ctrl.load = false
    })
  }

  updateStatus(skill, status){
    skill.status = status
    let ctrl = this
    this._Skill.update(skill).then(function(res){
      ctrl._skills.skills.splice(ctrl._skills.skills.indexOf(skill), 1)
    })
  }

  deleteSkill(skill){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return skill
            },
            service: function(){
              return ctrl._Skill
            },
            message: function(){
              return 'Are you sure?'
            }
        }
   }).result.then(function (result) {
      if (result == 'ok'){
        ctrl._skills.skills.splice(ctrl._skills.skills.indexOf(skill), 1)
      }
    });
  }

}


export default SkillsCtrl;
