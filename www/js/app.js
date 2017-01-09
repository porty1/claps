// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi', 'starter.controllers', 'starter.services','jsonFormatter'])
.constant('APPNAME', 'HelloI4MI')
.constant('APPSECRET', '8385bee7542099b10315dcb7b803b61a')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/tab-login.html',
      controller: 'LoginCtrl'
    })

      .state('homescreen', {
      url: '/homescreen',
      templateUrl: 'templates/homescreen.html',
      controller: 'HomescreenCtrl'
    })

  .state('details', {
        url: '/details',
        templateUrl: 'templates/details.html',
        controller: 'DetailsCtrl'
  })

  .state('addappointment', {
          url: '/addappointment',
          templateUrl: 'templates/addappointment.html',
          controller: 'addappointmentCtrl'
    })
  .state('vitaldataWeight', {
            url: '/weight',
            templateUrl: 'templates/vitaldata/weight.html',
            controller: 'VitalDataCtrl'
    })
    .state('vitaldataBP', {
              url: '/bp',
              templateUrl: 'templates/vitaldata/bp.html',
              controller: 'VitalDataCtrl'
      })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })
  // Each tab has its own nav history stack:

  .state('tab.calendar', {
    url: '/calendar',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/tab-calendar.html',
        controller: 'CalendarCtrl'
      }
    }
  })

  .state('tab.vitaldata', {
    url: '/vitaldata',
    views: {
      'tab-vitaldata': {
        templateUrl: 'templates/tab-vitaldata.html',
        controller: 'VitalDataCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('tab.menueplan', {
    url: '/menueplan',
    views: {
      'tab-menueplan': {
        templateUrl: 'templates/tab-menueplan.html',
        controller: 'MenueplanCtrl'
      }
    }
  })

  /*.state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: 'templates/tab-login.html',
          controller: 'LoginCtrl'
        }
      }
    })*/


;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');




});
