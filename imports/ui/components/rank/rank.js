import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './rank.html';

class rankCtrl{
	constructor($scope){
		$scope.viewModel(this);
		this.helpers({
			topUsers(){
				var top = Meteor.users.find({},{
					sort : {
						"profile.point" : -1
					}
				}, {
					limit : 10
				});
				return top;
			}
		})
	}
}

var module = angular.module('rankModule',[angularMeteor]);

const component = module.component('rank',{
	templateUrl: template,
	controller:rankCtrl
});


export default component;