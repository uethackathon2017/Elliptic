import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sidebar.html';

class sidebarCtrl{
	constructor($scope){
		'ngInject';
		$scope.viewModel(this);
		this.logined = false;
		this.helpers({
			logined(){
				if(Meteor.userId()) return true;
				return false;
			},
			user(){
				return Meteor.user();
			}
		});
	}
}

var module = angular.module('sidebarModule',[angularMeteor]);

const component = module.component('sidebar',{
	templateUrl: template,
	controller:sidebarCtrl
});

function config($stateProvider) {
  'ngInject';
    
}

export default component.config(config);