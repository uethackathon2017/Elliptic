import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import template from './bookCases.html';
import navbar from '../../ui/components/navbar/navbar.js';

class BookCasesCtrl {
  constructor($stateParams, $scope, $sce) {
    'ngInject';
    $scope.viewModel(this);
    this.helpers({
      review() {
        var data = [];
        var user = Meteor.users.findOne({ "_id": Meteor.userId() });
        if (user) {
          if (user.profile.book_cases) {
            var all_review_id = user.profile.book_cases;
            console.log(all_review_id);
            for (var i = 0; i < all_review_id.length; i++) {
              var tmp = { "book_cover": "", "book_name": "", "actor": "", "review_id": all_review_id[i] };
              var review_obj = Reviews.findOne({ "_id": all_review_id[i] });
              var book = Books.findOne({ "_id": review_obj.book_id });
              tmp.book_cover = book.cover;
              tmp.book_name = book.name;
              data.push(tmp);
            }
            console.log(data);
            return data;
          }
          else {
            return false;
          }
          
        }
        else {
          return false;
        }
      }
    })
  }
} 
const name = 'bookCases';
var module = angular.module(name,[
  angularMeteor, navbar.name, uiRouter
]);

const component = module.component('bookCases',{
	templateUrl: template,
	controller:BookCasesCtrl
});


export default component;
