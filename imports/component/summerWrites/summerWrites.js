import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import template from './summerWrites.html';
import navbar from '../../ui/components/navbar/navbar.js';

class SummerWritesCtrl {
  constructor($stateParams, $scope, $sce) {
    'ngInject';
    $scope.viewModel(this);
    this.cover = [];
    this.helpers({
      reviews() {
        var data = [];
        var user = Meteor.users.findOne({ "_id": Meteor.userId() });
        if (user) {
          var name = user.profile.name;
          var all_reviews = Reviews.find({"user_id": name});
          console.log(2);
          if(all_reviews) {
            var data = [];
            all_reviews.forEach(function(review_id) {
              var book = Books.findOne({"_id": review_id.book_id});
              if(book) {
                  data.push(book.cover);
              } else {
                data.push("images/1.jpg");
              }
            });
            console.log(data);
            this.cover = data;
            return all_reviews;
          }
        }
      },
			user(){
				return Meteor.user();
			}
    })
  }
} 
const name = 'summerWrites';
var module = angular.module(name,[
  angularMeteor, navbar.name, uiRouter
]);

const component = module.component('summerWrites',{
	templateUrl: template,
	controller:SummerWritesCtrl
});


export default component;
