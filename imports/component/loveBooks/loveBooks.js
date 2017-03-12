import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import template from './loveBooks.html';
import navbar from '../../ui/components/navbar/navbar.js';

class LoveBooksCtrl {
  constructor($stateParams, $scope, $sce) {
    'ngInject';
    $scope.viewModel(this);
    this.helpers({
      all_review() {
        var data = [];
        var user = Meteor.users.findOne({ "_id": Meteor.userId() });
        if (user) {
          if (user.profile.readed_book) {
            console.log(1);
            var data = [];
            var all_id = user.profile.readed_book;
            for(var i = 0; i < all_id.length; i++) {
              var review = Reviews.findOne({"_id": all_id[i].review_id})
              var user_avatar = Meteor.users.findOne({ "profile.name": review.user_id });
              if (user_avatar) {
                var tmp = {
                "user_name": review.user_id, "user_rate": review.user_rate,
                "user_view": review.user_view, "name": review.name,
                "star": parseInt(review.star), "avatar": user_avatar.profile.avatar,
                "_id": review._id, "description": review.description
                }
                data.push(tmp);
              }
            }
            console.log(data);
            return data;
          }
        }
      }
    })
  }
} 
const name = 'loveBooks';
var module = angular.module(name,[
  angularMeteor, navbar.name, uiRouter
]);

const component = module.component('loveBooks',{
	templateUrl: template,
	controller:LoveBooksCtrl
});


export default component;
