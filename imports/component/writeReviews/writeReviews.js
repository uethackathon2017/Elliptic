import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import template from './writeReviews.html';
import navbar from '../../ui/components/navbar/navbar.js';

class WriteReviewsCtrl {
  constructor($stateParams, $scope, $sce, $state) {
    'ngInject';
    this.book_id = $stateParams.reviewId;
    this.$state = $state;
    this.cover = [];
    $scope.viewModel(this);
    this.helpers({
      book() {
        var book = $stateParams.reviewId;
        var book_obj = Books.findOne({"_id": book});
        return book_obj;
      },
      review() {
        var users = Meteor.users.findOne({"_id": Meteor.userId()});
        if(users) {
          var name_user = users.profile.name;
          var reviews = Reviews.findOne({"user_id": name_user, "book_id": this.book_id});
          if(reviews) {
            reviews.forEach(function(review_id) {
              var book = Books.findOne({"_id": review_id.book_id});
              this.cover.push(book.cover);
            });
            return reviews;
          } else {
            return false;
          }
        }
      }
    });
  }
  save() {
    var book_obj = Books.findOne({"_id": this.book_id});
    var description = $('#mota').val();
    var content = $('.nd').html();
    var reviews = Reviews.findOne({"user_id": Meteor.user().profile.name, "book_id": this.book_id});
    if(reviews) {
      Reviews.update({
        "user_id": Meteor.user().profile.name, "book_id": this.book_id
      },{
        $set: {
          "content": content, 
          "description": description
        }
      })
    } else {
      Reviews.insert({"name": book_obj.name, "content": content, "description": description, "star": 0,
      "user_rate": 0, "user_view": 0, "user_id": Meteor.user().profile.name, "book_id": book_obj._id});
    }
    var test = Reviews.findOne({"name": book_obj.name, "user_id": Meteor.user().profile.name});
    console.log(test);
    this.$state.go('showoneReviews', {'reviewId' : test._id });
  }
}

const name = 'writeReviews';
var module = angular.module(name,[
  angularMeteor, navbar.name, uiRouter
]);

const component = module.component('writeReviews',{
	templateUrl: template,
	controller:WriteReviewsCtrl
}).filter('unsafe', function($sce) { return $sce.trustAsHtml; });;


export default component;
