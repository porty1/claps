var app = angular.module('starter.controllers', ["firebase"]).
  filter('plainText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

/* Login Page */
app.controller('LoginCtrl', function($scope, $state, $ionicModal) {

  $scope.cleanVariables = function() {
    $scope.error = null;
  }


/* --- Create User --- */
  $scope.createUser = function(user) {
    var email = user.email;
    var password = user.password;
    var name = user.name;
    var vorname = user.vorname;
    alert(name);
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });

    // Write User Data

    firebase.database().ref().child("/" + name + vorname + "/Appoint/Morgen/ID").set(1);
    firebase.database().ref().child("/" + name + vorname + "/Appoint/Mittag/ID").set(1);
    firebase.database().ref().child("/" + name + vorname + "/Appoint/Abend/ID").set(1);
    firebase.database().ref().child("/" + name + vorname + "/Appoint/Nacht/ID").set(1);

    firebase.database().ref().child("/" + name + vorname + "/Medis/Morgen/ID").set(1);
    firebase.database().ref().child("/" + name + vorname + "/Medis/Mittag/ID").set(1);
    firebase.database().ref().child("/" + name + vorname + "/Medis/Abend/ID").set(1);
    firebase.database().ref().child("/" + name + vorname + "/Medis/Nacht/ID").set(1);

    $state.go('tab.calendar');
    }


/*--- Login User ---*/
    $scope.loginUser = function(user) {
      var email = user.email;
      var password = user.password;
      alert(email);
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      }); $state.go('tab.calendar');
    }

/*--- Popup Register ---*/
$ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalRegister = modal;
  });

  // Open the modal
  $scope.openRegister = function() {
    $scope.cleanVariables();
    $scope.modalRegister.show();
  };

  // Close the modal
  $scope.closeRegister = function() {
    $scope.cleanVariables();
    $scope.modalRegister.hide();
  };

})

app.controller('CalendarCtrl', function($scope, $state) {
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

app.controller('VitalDataCtrl', function($scope) {})

app.controller('DetailsCtrl', function($scope) {})

app.controller('addappointmentCtrl', function($scope) {})

app.controller('SettingsCtrl', function($scope, I4MIMidataService, $state) {

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

/* .controller('LoginCtrl', function($scope, I4MIMidataService, $timeout, $state) {
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
}) */


;
