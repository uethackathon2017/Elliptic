import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './upload.html';

class uploadCtrl{
	constructor($scope,$state){
		'ngInject';
		$('navbar').show();
		$scope.viewModel(this);
		$('document').ready(function() {
			$.getScript('//cdnjs.cloudflare.com/ajax/libs/summernote/0.5.1/summernote.min.js',function(){
				$('#summernote').summernote();
			});
		});	
	}

	save(title,content) {
		console.log(title);
	}
}

var module = angular.module('upload', [angularMeteor]);
const component = module.component('upload',{
	templateUrl: template,
	controller:uploadCtrl
});

export default component;
