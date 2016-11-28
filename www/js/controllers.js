angular.module('starter.controllers', [])

.controller('CalendarCtrl', function($scope, $state) {
  $scope.data = {
      showDelete: false
    };

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };
    $scope.share = function(item) {
      alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function(item) {
      $scope.items.splice($scope.items.indexOf(item), 1);
    };

  // Alle anzuzeigenden Items im Kalender mit Startdatum, Enddatum und Beschreibung
  // Wird bei einer MiData Anbindung ersetzt
  // - schmf4
    $scope.items = [
      { start: "14:00", end:"15:00", title:"Test Appointment"},
      { start: "15:00", end:"16:00", title:"Test Appointment"},
      { start: "16:00", end:"17:00", title:"Test Appointment"},
      { start: "17:00", end:"18:00", title:"Test Appointment"},
      { start: "18:00", end:"19:00", title:"Test Appointment"},
      { start: "19:00", end:"20:00", title:"Test Appointment"},
      { start: "20:00", end:"22:00", title:"Test Appointment"},
      { start: "21:00", end:"23:00", title:"Test Appointment"},
      { start: "22:00", end:"24:00", title:"Test Appointment"},

      { id: 50 }
    ];
})

.controller('VitalDataCtrl', function($scope) {})

.controller('DetailsCtrl', function($scope) {})

.controller('addappointmentCtrl', function($scope) {})

.controller('SettingsCtrl', function($scope, I4MIMidataService, $state) {

  // Logout
  $scope.logout = function() {
    console.info("Logout");
    I4MIMidataService.logout();
    $state.go('login');
  }

  // Add Appointment
  $scope.addappointment = function() {
    $state.go('addappointment');
  }

})

.controller('LoginCtrl', function($scope, I4MIMidataService, $timeout, $state) {
  // Values for login
  I4MIMidataService.logout();
  $scope.login = {};
  $scope.login.email = '';
  $scope.login.password = '';
  $scope.login.server = 'https://test.midata.coop:9000';

  // Login
  $scope.doLogin = function() {
    //console.info(I4MIMidataService.currentUser());
    if ($scope.login.email != '' && $scope.login.password != '')
      I4MIMidataService.login($scope.login.email, $scope.login.password, $scope.login.server);
    //$scope.closeModal();
    setTimeout(function() {
      $scope.checkUser();
      // Verstecke Loading Spinner
    }, 3000);
  }
  // Check if valid User
  $scope.checkUser = function() {
    console.info(I4MIMidataService.currentUser());
    if (I4MIMidataService.currentUser() !== undefined) {
      //$state.go('home');
      $state.go('tab.calendar');
      console.info($scope.login.logOut)
    } else {
      I4MIMidataService.logout();
    }
  }
})


;
