import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import readBooks from '../readBooks/readBooks'
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import template from './showoneReviews.html';
import login from '../../ui/components/login/login.js';

class ShowoneReviewsCtrl {
  constructor($stateParams, $scope) {
    'ngInject';
    $scope.viewModel(this);
    $('navbar').show();
    this.review_id = $stateParams.reviewId;
    this.helpers({
      review() {
        var review_id = $stateParams.reviewId;
        var result = Reviews.find({ "_id": $stateParams.reviewId }).fetch()[0];
        return result;
      },
      book() {
        var data = { "cover": "" };
        var result = Reviews.find({ "_id": $stateParams.reviewId });
        result.forEach(function (review) {
          var book_id = review.book_id;
          var booksList = Books.find({
            "_id": book_id
          }).map(function (obj) {
            return {
              "cover": obj.cover
            };
          })
          data = booksList[0];
          this.review_id = review._id;
        })
        console.log(data);
        return data;
      },
      logined() {
				if(Meteor.userId()) return true;
				return false;
      },
      bookcase() {
        if (Meteor.userId()) {
          var review = Reviews.findOne({ "_id": this.review_id });
          if (review) {
            if (Meteor.user().profile.book_cases) {
            var user_of = Meteor.user().profile.book_cases;
            for (var i = 0; i < user_of.length; i++) {
              if (user_of[i] == review._id) {
                return true;
              }
            }
            return false;  
            } else {
              return false;
            }
          } 
        }
      }
    })
  }
  add(reviewID) {
    var book_cases = []
    if (Meteor.user().profile.book_cases) {
      book_cases = Meteor.user().profile.book_cases;
    } else {
      book_cases = [];
    }
    var check = true;
    for (var i = 0; i < book_cases.length; i++) {
      if (book_cases[i] == reviewID) {
        check = false;
      }
    }
    if (check) {
      book_cases.push(reviewID);
    }
    Meteor.users.update({
      "_id": Meteor.userId()
    },
      {
        $set: {
          "profile.book_cases": book_cases
        }
    });
    console.log(Meteor.user());
  }
  remove(reviewID) {
    var review = Reviews.findOne({ "_id": reviewID });
    var book_cases = Meteor.user().profile.book_cases;
    var check = true;
    for (var i = 0; i < book_cases.length; i++) {
      if (book_cases[i] == reviewID)
        book_cases.splice(i, 1);  
    }
     Meteor.users.update({
      "_id": Meteor.userId()
    },
      {
        $set: {
          "profile.book_cases": book_cases
        }
    });
  }
  view(reviewID) {
    var reviews = Reviews.findOne({ "_id": reviewID });
    var number = parseInt(reviews.user_view);
    Reviews.update({
      "_id": reviewID
    }, {
        $set: {
          "user_view": (number + 1).toString()
        }
    })
  }
}
const name = 'showoneReviews';
export default angular.module(name, [
angularMeteor, readBooks.name, login.name
])
  .component(name, {
    templateUrl: template,
    controller: ShowoneReviewsCtrl
  })
  .config(config);
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('showoneReviews', {
    url: '/reviews/:reviewId',
    template: '<showone-reviews></showone-reviews>', 
  });
}

