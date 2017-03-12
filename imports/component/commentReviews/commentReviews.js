import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Categories } from '../../api/categories.js';
import { Books } from '../../api/books.js';
import { Comments } from '../../api/comments.js';
import uiRouter from 'angular-ui-router';
import template from './commentReviews.html';

class CommentReviewsCtrl {
  constructor($stateParams, $scope, $sce,  $state) {
    'ngInject';
    this.review_id = $stateParams.reviewId;
    this.$state = $state;
    $scope.viewModel(this);
    this.helpers({
			comment() {
        return "";	
      },
      star() {
        return 0;
      }
		})	
  }
  save(name) {
    var user = Meteor.user().profile.name;
    var reviewId = this.review_id;
    var star = $('#value_star').val();
    console.log(reviewId);
    if (reviewId) {
      Comments.insert({ user_id: user, review_id: reviewId, content: name, star: star });
    }
    this.$state.go('showoneReviews', { 'reviewId': reviewId });
  }
} 
const name = 'commentReviews';
var module = angular.module(name,[
  angularMeteor, uiRouter
]);

const component = module.component('commentReviews',{
	templateUrl: template,
	controller:CommentReviewsCtrl
});


export default component;
