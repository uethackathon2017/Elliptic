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

import main from './main.js';

var module = angular.module('bookworm-app',[angularMeteor,uiRouter,sidebar.name,navbar.name,main.name,
  login.name,
  register.name,
  adminCategories.name,
  editCategories.name,
  addCategory.name,
  upload.name
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
      url: '/login',
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
    .state('upload',{
      url : "/upload",
      template : '<upload></upload>',
      onEnter : function() {
        $.getScript('//cdnjs.cloudflare.com/ajax/libs/summernote/0.5.1/summernote.min.js',function(){
          $('#summernote').summernote();
        });       
      }
    })
}

function run ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
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
