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

    var userdataforpush = {
      Name: name,
      Vorname: vorname,
      Email: email
    };


    var newPatientKey = firebase.database().ref().push().key;
    /* Add User Credentials to Database */
    var updatedata = {};
    updatedata[newPatientKey] = userdataforpush;

    return firebase.database().ref().update(updatedata);


    /*
    firebase.database().ref().child("/" + newPatientKey + "/Appoint/Morgen/ID").set(1);
    firebase.database().ref().child("/" + newPatientKey + "/Appoint/Mittag/ID").set(1);
    firebase.database().ref().child("/" + newPatientKey + "/Appoint/Abend/ID").set(1);
    firebase.database().ref().child("/" + newPatientKey + "/Appoint/Nacht/ID").set(1);

    firebase.database().ref().child("/" + newPatientKey + "/Medis/Morgen/ID").set(1);
    firebase.database().ref().child("/" + newPatientKey + "/Medis/Mittag/ID").set(1);
    firebase.database().ref().child("/" + newPatientKey + "/Medis/Abend/ID").set(1);
    firebase.database().ref().child("/" + newPatientKey + "/Medis/Nacht/ID").set(1);
    */

    $state.go('tab.calendar');
  }


  /*--- Login User ---*/
  $scope.loginUser = function(user) {
    var email = user.email;
    var password = user.password;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user){
        alert(user.displayName);
      }else{
        alert("noen");
      }
    })
    $state.go('tab.calendar');
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

app.controller('CalendarCtrl', function($scope, $state, $ionicModal) {
  /*
  var testers = new Date();
  var formDay = testers.getDay();
  var formMonth = testers.getMonth() + 1;
  var formYear = testers.getFullYear();
  var formDate = formDay + "-" + formMonth + "-" + formYear;
  document.getElementById("changeDatum").value = formDate;

  var asdf = new Date();
  $("#datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        defaultDate: asdf,
        onSelect: function () {
            selectedDate = $.datepicker.formatDate("yy-mm-dd", $(this).datepicker('getDate'));
        }
    });

  $("#datepicker").val(asdf);

  $( function() {
    $( "#datepicker" ).datepicker({ dateFormat: 'dd-mm-yy' });
    $("#datepicker").datepicker("setDate", new Date(2016,12,13) )
  } );

  // document.getElementById("changeDatum").val();
  (function () {

    var date = new Date().toISOString().substring(0, 10),
    field = document.querySelector("#changeDatum");
    field.value = date;
    console.log(field.value);

    console.log($("#changeDatum").val());
  })()*/

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

  $scope.datechange = function(SessionUser) {
    // alert(SessionUser.name);

    // Morgen
    var patientRef = firebase.database().ref('SchmiedFabian/Medis/Morgen');
    patientRef.on("child_added", snap => {
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
    var patientRef = firebase.database().ref('SchmiedFabian/Appoint/Morgen');
    patientRef.on("child_added", snap => {
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
    var patientRef = firebase.database().ref('SchmiedFabian/Medis/Mittag');
    patientRef.on("child_added", snap => {
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
    var patientRef = firebase.database().ref('SchmiedFabian/Appoint/Mittag');
    patientRef.on("child_added", snap => {
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
    var patientRef = firebase.database().ref('SchmiedFabian/Medis/Abend');
    patientRef.on("child_added", snap => {
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
    var patientRef = firebase.database().ref('SchmiedFabian/Appoint/Abend');
    patientRef.on("child_added", snap => {
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
    var patientRef = firebase.database().ref('SchmiedFabian/Medis/Nacht');
    patientRef.on("child_added", snap => {
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
    var patientRef = firebase.database().ref('SchmiedFabian/Appoint/Nacht');
    patientRef.on("child_added", snap => {
      var datum = snap.child("Datum").val();
      var datumoutput = new Date(datum);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var zeit = snap.child("Zeit").val();
      var beschreibung = snap.child("Beschreibung").val();
      var name = snap.child("Name").val();
      $("#list_nacht").append("<li class='item'> <b>Beschreibung: " + beschreibung + "  </b><br>Datum: " + dayoutput + "." + monthoutput + "." + yearoutput + " │ Zeit: " + zeit + "</li>");
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
      var currentPatient = "SchmiedFabian";

      var datumpush = datum.getTime();

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
    $scope.modal.hide();
  }
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
