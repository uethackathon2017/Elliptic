import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Categories} from '../../../api/categories.js';
import template from './editCategories.html';

class editCategories{
	constructor($scope,$stateParams, $state, $reactive){
		'ngInject';
		this.$state = $state;
		$('navbar').show();
		$scope.viewModel(this);
		this.helpers({
			categoryId() {
				return $stateParams.categoryId;	
			},
			category(){
				var a = Categories.findOne({_id : $stateParams.categoryId});
				return a;
			}
		})		
	}

	save(name,description){
		console.log(this.category._id);
		Categories.update({
			_id : this.category._id
		},{
			$set: {
				name : name,
				description : description,
			}
		})
		this.$state.go('adminCategory');
	}
}

var module = angular.module('editCategories',[angularMeteor]);

const component = module.component('editCategories',{
	templateUrl: template,
	controller:editCategories
});

export default component;
