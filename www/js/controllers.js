var app = angular.module('starter.controllers', ["firebase"]).
filter('plainText', function() {
  return function(text) {
    return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
}
);

/* Login Page */
app.controller('LoginCtrl', function($scope, $state, $ionicModal, $location, $timeout) {

  $scope.cleanVariables = function() {
  $scope.error = null;
}

/* --- Pin Code --- */

// Initialize Pincode
$scope.passcode = "";

// Add Pin aus Login.html - Number Buttons
$scope.addPin = function(value) {
  if($scope.passcode.length < 4) {
    $scope.passcode = $scope.passcode + value;
    // Bei allen eingegeben Pins soll den User für den entsprechenden Pin gesucht werden
    if($scope.passcode.length == 4) {
      $timeout(function() {
        console.log("The four digit code was entered");
        console.log($scope.passcode);
        var testref = firebase.database().ref();
        testref.orderByChild("PIN").equalTo($scope.passcode).once("child_added", snap => {
          console.log("inorderbycuhasdgasjdg");
          var pinuser = snap.child("PIN").val();
          var emailuser = snap.child("Email").val();
          var passworduser = snap.child("Password").val();
          console.log(emailuser, passworduser);
          $scope.loginUser(emailuser, passworduser);
        })
        // $scope.loginUser("schmf4@bfh.ch", "test1234");
        console.log("test1");
      }, 500);
    } console.log("test2");
  }
}

// Eingegebene Pinstelle löschen
$scope.deletePin = function() {
  if($scope.passcode.length > 0) {
    $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
  }
}

/*--- Login User ---*/
$scope.loginUser = function(email, pwd) {
  console.log("test3");
  var email = email;
  var password = pwd;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

// Eventlistener der active wird wenn sich der Status der Authetifizierung ändert (Login / Logout)
firebase.auth().onAuthStateChanged(function(user) {
  if (user){
    console.log(user.email);
    $state.go('tab.calendar');
  }else{
    console.log("No User Logged In");
  }
})

/* --- Create User --- */
$scope.createUser = function(user) {
  var email = user.email;
  var password = user.password;
  var name = user.name;
  var vorname = user.vorname;
  var pincode = user.pin;

  firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  // Write User Data
  firebase.database().ref(name + vorname).set({
    Name: name,
    Vorname: vorname,
    Email: email,
    PIN: pincode,
    Password: password
  });

  $state.go('tab.calendar');
  $scope.closeRegister();
}

/*--- Popup Registrierung ---*/
$ionicModal.fromTemplateUrl('templates/register.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modalRegister = modal;
});

// Modal View öffnen
$scope.openRegister = function() {
  $scope.cleanVariables();
  $scope.modalRegister.show();
};

// Modal View schliessen
$scope.closeRegister = function() {
  $scope.cleanVariables();
  $scope.modalRegister.hide();
};
})

app.controller('CalendarCtrl', function($scope, $state, $ionicModal, $location, $timeout) {

  /* var testers = new Date();
  var formDay = testers.getDate();
  var formMonth = testers.getMonth() + 1;
  var formYear = testers.getFullYear();
  var formDate = formYear + "-" + formMonth + "-" + formDay;
  console.log(formDate);
  document.getElementById("changeDatum").value = "formDate";
  console.log(document.getElementById("changeDatum").value); */

  // Wird durch das Wechseln des Datums im Calendar.html aufgerufen
  $scope.datechange = function() {

    var selected = document.getElementById("changeDatum").value;
    var selectedDateParse = Date.parse(selected);
    console.log(selectedDateParse);

    var loggedinuser = firebase.auth().currentUser;
    $scope.fullname = "";

    var loggedinref = firebase.database().ref();
    loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
      var nameuser = snap.child("Name").val();
      var vornameuser = snap.child("Vorname").val();
      $scope.getMedis(nameuser, vornameuser, selectedDateParse);
      $scope.getAppoint(nameuser, vornameuser, selectedDateParse);
    });
  }

  $scope.getMedis = function(name, vorname, msecdatum){

    var fullname = name + vorname;

    // Morgen
    var patientRef = firebase.database().ref(fullname + '/Medis/Morgen');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      $("#list_morgen").append("<li class='item'> <b>Name: " + name + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Dosis: " + dosis + " │ Form: " + form + "</li>");
    });

    // Mittag
    var patientRef = firebase.database().ref(fullname + '/Medis/Mittag');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      $("#list_mittag").append("<li class='item'> <b>Name: " + name + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Dosis: " + dosis + " │ Form: " + form + "</li>");
    });

    // Abend
    var patientRef = firebase.database().ref(fullname + '/Medis/Abend');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      $("#list_abend").append("<li class='item'> <b>Name: " + name + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Dosis: " + dosis + " │ Form: " + form + "</li>");
    });

    // Nacht
    var patientRef = firebase.database().ref(fullname + '/Medis/Nacht');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      $("#list_nacht").append("<li class='item'> <b>Name: " + name + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Dosis: " + dosis + " │ Form: " + form + "</li>");
    });
  }

  $scope.getAppoint = function(name, vorname, msecdatum){

    var fullname = name + vorname;
    console.log(fullname, msecdatum);

    // Morgen
    var patientRef = firebase.database().ref(fullname + '/Appoint/Morgen');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var zeit = snap.child("Zeit").val();
      var beschreibung = snap.child("Beschreibung").val();
      var name = snap.child("Name").val();
      $("#list_morgen").append("<li class='item'> <b>Beschreibung: " + beschreibung + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Zeit: " + zeit + "</li>");
    });
    // Mittag
    var patientRef = firebase.database().ref(fullname + '/Appoint/Mittag');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var zeit = snap.child("Zeit").val();
      var beschreibung = snap.child("Beschreibung").val();
      var name = snap.child("Name").val();
      $("#list_mittag").append("<li class='item'> <b>Beschreibung: " + beschreibung + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Zeit: " + zeit + "</li>");
    });
    // Abend
    var patientRef = firebase.database().ref(fullname + '/Appoint/Abend');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var zeit = snap.child("Zeit").val();
      var beschreibung = snap.child("Beschreibung").val();
      var name = snap.child("Name").val();
      $("#list_abend").append("<li class='item'> <b>Beschreibung: " + beschreibung + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Zeit: " + zeit + "</li>");
    });
    // Nacht
    var patientRef = firebase.database().ref(fullname + '/Appoint/Nacht');
    patientRef.orderByChild("Datum").equalTo(msecdatum).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var zeit = snap.child("Zeit").val();
      var beschreibung = snap.child("Beschreibung").val();
      var name = snap.child("Name").val();
      $("#list_Nacht").append("<li class='item'> <b>Beschreibung: " + beschreibung + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Zeit: " + zeit + "</li>");
    });
  }

  /*--- Popup Add Appointment ---*/
  $ionicModal.fromTemplateUrl('templates/addappointment.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createAppointment = function(appointvalue) {

    var datum = new Date(appointvalue.date);
    var zeit = new Date(appointvalue.time);
    var beschreibungpush = appointvalue.area;

    var loggedinuser = firebase.auth().currentUser;
    var loggedinref = firebase.database().ref();
    loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
      var nameuser = snap.child("Name").val();
      var vornameuser = snap.child("Vorname").val();
      $scope.setAppoint(nameuser, vornameuser, datum, zeit, beschreibungpush);
    });
    $scope.modal.hide();
  }

  $scope.setAppoint = function(nameuser, vornameuser, datum, zeit, beschreibungpush){

    var currentPatient = nameuser + vornameuser;

    var datumpush = datum.getTime();
    datumpush = datumpush + 3600000;

    var zeitcompare = zeit.getHours() + "" + zeit.getMinutes();
    var zeitpush = zeit.getHours() + ":" + zeit.getMinutes();

    console.log(datumpush);
    console.log(zeitpush);
    console.log(beschreibungpush);

    var dataforpush = {
      Datum: datumpush,
      Zeit: zeitpush,
      Beschreibung: beschreibungpush
    };

    if (zeitcompare >= 0400 && zeitcompare < 1000){
      var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + 'Appoint/').push().key;
      var morgenupdatedata = {};
      morgenupdatedata[currentPatient + '/Appoint/Morgen/' + morgennewAppointmentKey] = dataforpush;
      addMorgen(morgenupdatedata);
      console.log("morgen");
    }
    else if (zeitcompare >= 1000 && zeitcompare < 1600){
      var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + 'Appoint/').push().key;
      var mittagupdatedata = {};
      mittagupdatedata[currentPatient + '/Appoint/Mittag/' + mittagnewAppointmentKey] = dataforpush;
      addMittag(mittagupdatedata);
      console.log("mittag");
    }
    else if (zeitcompare >= 1600 && zeitcompare < 2200){
      var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + 'Appoint/').push().key;
      var abendupdatedata = {};
      abendupdatedata[currentPatient + '/Appoint/Abend/' + abendnewAppointmentKey] = dataforpush;
      addAbend(abendupdatedata);
      console.log("abend");
    }
    else if (zeitcompare >= 2200 || zeitcompare < 0400) {
      var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + 'Appoint/').push().key;
      var nachtupdatedata = {};
      nachtupdatedata[currentPatient + '/Appoint/Nacht/' + nachtnewAppointmentKey] = dataforpush;
      addNacht(nachtupdatedata);
      console.log("nacht");
    }
    else {
      console.log("error");
    }

    function addMorgen(morgenupdatedata){
      return firebase.database().ref().update(morgenupdatedata);
    }
    function addMittag(mittagupdatedata){
      return firebase.database().ref().update(mittagupdatedata);
    }
    function addAbend(abendupdatedata){
      return firebase.database().ref().update(abendupdatedata);
    }
    function addNacht(nachtupdatedata){
      return firebase.database().ref().update(nachtupdatedata);
    }
  }
})

app.controller('VitalDataCtrl', function($scope) {})

app.controller('DetailsCtrl', function($scope) {})

app.controller('addappointmentCtrl', function($scope) {})

app.controller('SettingsCtrl', function($scope, I4MIMidataService, $state) {

  // Logout
  $scope.logout = function() {
    console.info("Logout");
    firebase.auth().signOut().then(function(){
      console.log("Logout Successful");
    }, function(error){
      console.log("error");
    })
    $state.go('login');
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
