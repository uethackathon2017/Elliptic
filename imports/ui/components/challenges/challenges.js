import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Books} from '../../../api/books.js';
import template from './challenges.html';

class challengesCtrl{
	constructor($scope){
		'ngInject';
		$scope.viewModel(this);
		this.disable = false;
		this.helpers({
			disable(){

				var tmp = Meteor.users.findOne({_id : Meteor.userId()});
				if(tmp){
					if(tmp.profile.timech){
						return true;
					} else {
						return false;
					}
				}
			},
			timeCh(){
				var tmp = Meteor.users.findOne({_id : Meteor.userId()});
				if(tmp){
					console.log(tmp);
					return tmp.profile.timech * 60;
				};
			},
			totalTime(){
				var tmp = Meteor.users.findOne({_id : Meteor.userId()});
				var total_readed = 0;
				if(tmp){
					var readed_book = tmp.profile.readed_book;
					if(readed_book){
						for( i = 0; i < readed_book.length ; i ++){
							total_readed += readed_book[i].timming;
							}
						}
						if(total_readed){
							return Math.round( total_readed/1000/60);
						}						
					}
					return total_readed;

			},
			progress(){
				var tmp = Meteor.users.findOne({_id : Meteor.userId()});
				var total_readed = 0;
				var timech = 0;
				if(tmp){
					var readed_book = tmp.profile.readed_book;
					timech = tmp.profile.timech;
					console.log(tmp);
					if(readed_book){
						console.log(readed_book);
						for( i = 0; i < readed_book.length ; i ++){
							total_readed += readed_book[i].timming;
							if(total_readed){
								console.log(total_readed/(timech * 1000 * 60 *60) * 100);
								return Math.round(total_readed/(timech * 1000 * 60 * 60) * 100);
								}							
							}
						}
					}
					return 0;
				}
			})
		}

	setTime(time){
		console.log(time);

		Meteor.users.update({
			_id : Meteor.userId()
		},{
			$set : {
				"profile.timech" : time,
			}
		});
		this.disable = true;
	}
}
var module = angular.module('challengesModule',[angularMeteor,uiRouter]);

const component = module.component('challenges',{
	templateUrl: template,
	controller:challengesCtrl
});

export default component;
