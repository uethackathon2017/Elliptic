import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';

import sidebar from '../imports/ui/components/sidebar/sidebar.js';
import navbar from '../imports/ui/components/navbar/navbar.js';
import login from '../imports/ui/components/login/login.js';
import register from '../imports/ui/components/register/register.js';
import adminCategories from '../imports/ui/components/admin/categories.js';
import editCategories from '../imports/ui/components/admin/editCategories.js';
import addCategory from '../imports/ui/components/admin/addCategory.js';
import upload from '../imports/ui/components/upload/upload.js';
import profile from '../imports/ui/components/profile/profile.js';
import search from '../imports/ui/components/search/search.js';
import rank from '../imports/ui/components/rank/rank.js';
import commentReviews from '../imports/component/commentReviews/commentReviews.js';
import writeReviews from '../imports/component/writeReviews/writeReviews.js';
import summerWrites from '../imports/component/summerWrites/summerWrites.js';
import challenges from '../imports/ui/components/challenges/challenges.js';
import loveBooks from '../imports/component/loveBooks/loveBooks.js';

import bookCases from '../imports/component/bookCases/bookCases.js'

import main from './main.js';

var module = angular.module('bookworm-app',[angularMeteor,uiRouter,sidebar.name,navbar.name,main.name,
  login.name,
  register.name,
  adminCategories.name,
  editCategories.name,
  addCategory.name,
  upload.name,
  profile.name,
  bookCases.name,
  search.name,
  commentReviews.name,
  challenges.name,
  writeReviews.name,
  summerWrites.name,
  rank.name,
  loveBooks.name
  ]);

module.config(config);
module.run(run);

function config($stateProvider,$locationProvider, $urlRouterProvider,$qProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $qProvider.errorOnUnhandledRejections(false);
  $stateProvider
    .state('home', {
      url: '/',
      template: '<main-component></main-component>',
    })
    .state('login', {
      url: '/login/:loginID',
      template: '<login></login>',
    })
    .state('register', {
      url: '/register',
      template: '<register></register>',
    })
    .state('logout',{
      url: '/logout',
      template: '<main-component></main-component>',
      controller : function(){
        Meteor.logout();
      }
    })
    .state('adminCategory',{
      url : "/admin/categories",
      template : '<admin-categories></admin-categories>'
    })
    .state('adminEditCategories',{
      url:'/admin/categories/edit/:categoryId',
      template : '<edit-categories></edit-categories>'
    })
    .state('adminAddCategories',{
      url: "/admin/categories/add",
      template : '<add-category></add-category>'
    })
    .state('profile', {
      url: '/profile',
      template: '<profile></profile>',
    })
    .state('search', {
      url: "/search?search",
      template: '<search></search>',
    })
    .state('bookCases', {
      url: "/bookCases",
      template : "<book-cases></book-cases>"
    })
    .state('commentReviews', {
      url: '/commentReviews/:reviewId',
      template: '<comment-reviews></comment-reviews>'
    })
    .state('challenges', {
      url : '/challenges',
      template: '<challenges></challenges>'
    })
    .state('rank', {
      url : '/rank',
      template: '<rank></rank>'
    })
    .state('writeReviews', {
      url : '/writeReviews/:reviewId',
      template: '<write-reviews></write-reviews>'
    })
    .state('summerWrites', {
      url : '/summerWrites',
      template: '<summer-writes></summer-writes>'
    })
    .state('loveBooks', {
      url : '/loveBooks',
      template: '<love-books></love-books>'
    })
}

function run ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login/1');
    }
  });

  Accounts.onLogin(function () {
    if ($state.is('login') || $state.is('register')) {
      $state.go('home');
    }
  });
  Accounts.onLogout(function () {
    $state.go('home');
  });
}
