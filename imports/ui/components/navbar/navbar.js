import angular from 'angular';
import angularMeteor from 'angular-meteor';
import sidebar from '../sidebar/sidebar.js';
import template from './navbar.html';

class navbarCtrl{
	constructor(){
		
	}
}
var module = angular.module('navbarModule',[angularMeteor,sidebar.name]);

const component = module.component('navbar',{
	templateUrl: template,
	controller:navbarCtrl
});

export default component;