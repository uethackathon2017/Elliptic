import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Categories } from '../../api/categories.js';
import { Books } from '../../api/books.js';
import template from './showallBooks.html';
import navbar from '../../ui/components/navbar/navbar.js';

class showallBooksCtrl 
{
   constructor($stateParams, $scope) {
    'ngInject';
    $('navbar').show();
    this.categoryId = $stateParams.categoryId;
    $scope.viewModel(this);
    this.helpers({
      categoryId() {
        var id_category = $stateParams.categoryId;
        var all_book = Books.find({ "category_id": id_category });
        return all_book;
      },
      categoryName() {
        var name = Categories.findOne({ "_id": $stateParams.categoryId });
        return name;
      }
    }) 
  }
}

const name = 'showallBooks';
export default angular.module(name, [
angularMeteor, navbar.name
])
  .component(name, {
    templateUrl: template,
    controller: showallBooksCtrl
  })
  .config(config);
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('showallBooks', {
    url: '/categorys/:categoryId',
    template: '<showall-books></showall-books>'
  });
}
