import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';

import template from './profile.html';

class profileCtrl{
	constructor($scope){
		'ngInject';
		$scope.viewModel(this);
		this.errors = "";
		this.success = "";
		this.helpers({
			currentUser() {
				return Meteor.user();
			}
		})
	}
	addImages(files){
		if (files.length){
			this.currentFile = files[0];
			const reader = new FileReader;
			reader.onload = function(e){
				$("#avatar").attr("src",reader.result);
				var avatar = reader.result;
				console.log(Meteor.userId());
				Meteor.users.update({
					_id : Meteor.userId()
				},{
					$set : {
						"profile.avatar" : avatar,
					}
				});
			}
			reader.readAsDataURL(files[0]);
			
		}
		
	}

	changePassword(password,password2,new_password){
		var message = this;
		if(password != password2){
			message.errors = "Mat khau khong khop";
			return false;
		} else {
			Accounts.changePassword(password,new_password,function(Error){
				if(Error){
					message.errors = Error.reason;
				}else {
					message.success = "Ban da doi mat khau thanh cong";
					this.password = "";
					this.password2 = "";
					this.new_password = "";
				}
			});
		}

	}
}

var module = angular.module('profileModule',[angularMeteor,ngFileUpload]);

const component = module.component('profile',{
	templateUrl: template,
	controller:profileCtrl
});

export default component;