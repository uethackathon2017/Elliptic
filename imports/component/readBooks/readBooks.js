import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Reviews } from '../../api/reviews.js';
import { Books } from '../../api/books.js';
import template from './readBooks.html';
import navbar from '../../ui/components/navbar/navbar.js';

class ReadBooksCtrl {
  constructor($stateParams, $scope, $sce) {
    'ngInject';
    $('navbar').hide();
    $scope.viewModel(this);
    this.helpers({
      review() {
        var review_id = $stateParams.reviewId;
        var result = Reviews.find({
          "_id": $stateParams.reviewId
        }).map(function (obj) {
            return {
              "content": obj.content
            };
          });
        var data = result[0];
        console.log(data);
        return data;
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
        })
        console.log(data);
        return data;
      },
      logined(){
				if(Meteor.userId()) return true;
				return false;
			}
    })
  }
}
const name = 'readBooks';
export default angular.module(name, [
angularMeteor, navbar.name
])
  .component(name, {
    templateUrl: template,
    controller: ReadBooksCtrl
  })
  .config(config).filter('unsafe', function($sce) { return $sce.trustAsHtml; });
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('readBooks', {
    url: '/readBooks/:reviewId',
    template: '<read-books></read-books>',
    onEnter: function() {
      console.log(Date.now());
      Session.set("start", Date.now());
    },
    onExit : function(){
     var tmp_time = Session.get("start");
     var timming = Date.now() - tmp_time;
     var user = Meteor.user();
     var id = this.params.reviewId; 
     var tmp = user.profile.readed_book;
     if (!tmp) {
       var tmp_readed = [];
       var data = { "review_id": id, "hour": timming };
       tmp_readed.push(data);
       	Meteor.users.update({
					_id : Meteor.userId()
				},{
					$set : {
						"profile.readed_book" : data,
					}
            });
        console.log(Meteor.user());
     } else {
       var tmp_readed = [];
       var datas = tmp;
       for (var i = 0; i < datas.length; i++) {
         if (data[i].review_id == id) {
           var time_old = data[i].hour;
           var time_new = timming + parseInt(time_old);
           data[i].hour = time_new;
           break;
         }
       }
       Meteor.users.update({
					_id : Meteor.userId()
				},{
					$set : {
						"profile.readed_book" : datas,
					}
      });
     }
     
  }
});
}

