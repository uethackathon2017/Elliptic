import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import template from './writeReviews.html';
import navbar from '../../ui/components/navbar/navbar.js';

class WriteReviewsCtrl {
  constructor($stateParams, $scope, $sce) {
    'ngInject';
    $scope.viewModel(this);
    this.helpers({
      book() {
        var book = $stateParams.reviewId;
        var book_obj = Books.findOne({"_id": book});
        return book_obj;
      }
    });
  }
  save() {
    var description = $('#mota').val();
    var content = $('.nd').html();
  }
}

const name = 'writeReviews';
var module = angular.module(name,[
  angularMeteor, navbar.name, uiRouter
]);

const component = module.component('writeReviews',{
	templateUrl: template,
	controller:WriteReviewsCtrl
});


export default component;
