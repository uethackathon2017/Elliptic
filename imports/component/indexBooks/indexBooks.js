import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Categories } from '../../api/categories.js';
import { Books } from '../../api/books.js';
import showReviews from '../showReviews/showReviews';
import showallBooks from '../showallBooks/showallBooks';
import template from './indexBooks.html';

class IndexBooksCtrl {
   constructor($scope) {
     $scope.viewModel(this);
    this.helpers({
      categories() {
        var data = [];
        var tmp = Categories.find({});
        tmp.forEach(function (category) {
          var data_category = { "category": "","id": "", "data_book": [] };
          var element = category;
          data_category.category = element.name;
          data_category.id = element._id;
          console.log(element._id);
          var booksList = Books.find({
              "category_id": element._id
          }).map(function (obj) {
              return {
                  "name": obj.name,
                  "id": obj._id,
                  "cover": obj.cover
              };
          })
          
          data_category.data_book = booksList;
          data.push(data_category);
        });
        console.log(data);
        return data;
      }
    }) 
   }
}
 
export default angular.module('indexBooks', [
  angularMeteor, showReviews.name, showallBooks.name
])
  .component('indexBooks', {
    templateUrl: template,
    controller: IndexBooksCtrl
  });
