import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import showoneReviews from '../showoneReviews/showoneReviews'
import template from './showReviews.html';
import navbar from '../../ui/components/navbar/navbar.js';

class ShowReviewsCtrl {
  constructor($stateParams, $scope) {
    'ngInject';
    $('navbar').show();
 
    $scope.viewModel(this);
    this.helpers({
      all_review() {
        var data = [];
        var book_id = $stateParams.bookId;
        console.log(book_id);
        var all_reviews = Reviews.find({ "book_id": book_id });
        if (all_reviews.count() == 0) {
          return 0;  
        }
        all_reviews.forEach(function (review) {
          
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
        });
        return data; 
      },
      book_cover() {
        var book_id = $stateParams.bookId;
        var cover_obj = Books.findOne({ "_id": book_id });
        return cover_obj;
      }
    })
  }
}
const name = 'showReviews';
export default angular.module(name, [
angularMeteor, navbar.name, showoneReviews.name
])
  .component(name, {
    templateUrl: template,
    controller: ShowReviewsCtrl
  })
  .config(config);
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('showReviews', {
    url: '/books/:bookId',
    template: '<show-reviews></show-reviews>'
  });
}

