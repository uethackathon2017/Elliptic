import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './login.html';

class loginCtrl{

	constructor($scope, $stateParams){
		'ngInject';
		var tmp = $stateParams.loginID;
		if (tmp == '1') {
			$('.error_login').hide();
		} else {
			$('.error_login').show();
		}
		$scope.viewModel(this);
		this.errors = "";
	}

	loginUser(username,password){
		var m = this;
		Meteor.loginWithPassword(username,password,function(error){
			if(error){
				m.errors = error.reason;
			} else {
				
			}
		});
	}
}

var module = angular.module('loginModule',[angularMeteor,uiRouter]);

const component = module.component('login',{
	templateUrl: template,
	controller:loginCtrl
});


export default component;
