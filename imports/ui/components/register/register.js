import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './register.html';

class registerCtrl{
	constructor($scope){
		$scope.viewModel(this);
	}

	registerUser(username,password){
		var tmp = this;
		Accounts.createUser({
			username: username,
			password: password,
			profile: {
				name: username,
				point: 50
			}
		}, function (err) {
			if(err){
				console.log(err.reason);
				tmp.error = err.reason;
			} else {
				
			}
		});
	}
}

var module = angular.module('registerModule',[angularMeteor]);

const component = module.component('register',{
	templateUrl: template,
	controller:registerCtrl
});


export default component;
