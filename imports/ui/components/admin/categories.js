import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Categories} from '../../../api/categories.js';
import template from './categories.html';

class adminCategory{
	constructor($scope){
		'ngInject';
		$('navbar').show();
		$scope.viewModel(this);
		this.helpers({
			categories() {
				return Categories.find();	
			}
		})		
	}

	deleteCategory(category) {
		Categories.remove(category._id);
	}
}

var module = angular.module('categoryModule',[angularMeteor]);

const component = module.component('adminCategories',{
	templateUrl: template,
	controller:adminCategory
});

export default component;
