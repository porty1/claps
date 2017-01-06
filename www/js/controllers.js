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
          var emailuser;
          var passworduser;
          var testref = firebase.database().ref();
          testref.orderByChild("PIN").equalTo($scope.passcode).on("child_added", snap => {
            console.log("inorderby");
            emailuser = snap.child("Email").val();
            passworduser = snap.child("Password").val();
            console.log(emailuser, passworduser);

          })
          document.getElementById("loader").style.display = "block";
          $timeout(function() {
            if (emailuser == null){
              document.getElementById("loader").style.display = "none";
              document.getElementById("error").style.display = "block";
              console.log("error" + emailuser);
            } else {
              document.getElementById("loader").style.display = "none";
              console.log(emailuser);
              $scope.loginUser(emailuser, passworduser);
            }
          }, 2000);
          // $scope.loginUser("schmf4@bfh.ch", "test1234");
        }, 0);
      }
    }
  }

  $scope.clearAllPins = function() {
    $scope.deletePin();
    $scope.deletePin();
    $scope.deletePin();
    $scope.deletePin();
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
    var pincode = "";
    pincode = pincode + user.pin;

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

  var fullname = "";
  var currentDatum = new Date();
  console.log(currentDatum);
  var currentDatumDay = currentDatum.getDate();
  var currentDatumMonth = currentDatum.getMonth() + 1;
  var currentDatumYear = currentDatum.getFullYear();
  var currentDatummsec = Date.parse(currentDatumMonth + "/" + currentDatumDay + "/" + currentDatumYear);
  $scope.date = {datum: new Date(currentDatummsec)};
  console.log($scope.date.datum);


  $scope.forwardoneDay = function(){
    var selectedchangeDatumforward = document.getElementById("changeDatum").value;
    console.log("forward"  + selectedchangeDatumforward);
    var selectedchangeDatumforwardDateParse = Date.parse(selectedchangeDatumforward);
    var thedayforward = selectedchangeDatumforwardDateParse + 86400000;
    console.log("thedayforward: " + thedayforward);
    $scope.date = {datum: new Date(thedayforward)};
    console.log("DateForward" + $scope.date.datum);
    $scope.datechange();
  }

  $scope.backoneDay = function(){
    var selectedchangeDatumbackward = document.getElementById("changeDatum").value;
    console.log("back" + selectedchangeDatumbackward);
    var selectedchangeDatumbackDateParse = Date.parse(selectedchangeDatumbackward);
    var thedayback = selectedchangeDatumbackDateParse - 86400000;
    console.log("thedayback: " + thedayback);
    $scope.date = {datum: new Date(thedayback)};
    console.log("DateBackward" + $scope.date.datum);
    $scope.datechange();
  }


  // Wird durch das Wechseln des Datums im Calendar.html aufgerufen
  $scope.datechange = function() {

    var selected = $scope.date.datum;
    var selectedDateParse = Date.parse(selected);
    console.log(selectedDateParse);
    $scope.emptytheTable();

    var loggedinuser = firebase.auth().currentUser;
    // $scope.fullname = "";

    var loggedinref = firebase.database().ref();
    loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
      var nameuser = snap.child("Name").val();
      var vornameuser = snap.child("Vorname").val();
      $scope.startgetAllDates(nameuser, vornameuser, selectedDateParse);
      // $scope.getAppoint(nameuser, vornameuser, selectedDateParse);
    });
  }

  $scope.startgetAllDates = function(name, vorname, msecdatum){
    // Step 0: Instanzieren
    fullname = name + vorname;
    msecdatum = msecdatum - 3600000;
    var msecend = msecdatum + 86399999;
    console.log("getAllDates: " + fullname, msecdatum, msecend);
    $scope.getNachtAppointbeforeMorgen(fullname, msecdatum);
  }

  $scope.getNachtAppointbeforeMorgen = function(fullname, msecdatum){
    // Step 1: All Appointments between 00:00Uhr and 04:00
    var msecstartpush = "" + msecdatum;
    var msecend = msecdatum + 14400000;
    var msecendpush = "" + msecend;
    console.log("Step1: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Nacht');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Nacht: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Nacht/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getMorgenAppointbeforeMedi(fullname, msecdatum);
  }

  $scope.getMorgenAppointbeforeMedi = function(fullname, msecdatum){
    // Step 2: All Appointments before 8:00Uhr
    var msecstartpush = "" + msecdatum;
    var msecend = msecdatum + 28800000;
    var msecendpush = "" + msecend;
    console.log("Step2: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Morgen');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Morgen: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Morgen/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getMorgenMedis(fullname, msecdatum);
  }

  $scope.getMorgenMedis = function(fullname, msecdatum){
    // Step 3: Medis am Morgen
    var msecmedidatum = msecdatum + 3600000;
    var msecstartpush = "" + msecmedidatum;

    var patientRef = firebase.database().ref(fullname + '/Medis/Morgen');
    patientRef.orderByChild("Datum").equalTo(msecstartpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Medis Morgen: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      var zeit = snap.child("Zeit").val();
      var key = snap.key;
      var path = fullname + "/Medis/Morgen/" + key;
      $scope.MeditoTable(dosis, form, name, zeit, path);
    });
    $scope.getMorgenAppointafterMedi(fullname, msecdatum);
  }

  $scope.getMorgenAppointafterMedi = function(fullname, msecdatum){
    // Step 4: All Appointments between 8:00Uhr and 10:00Uhr
    var msecstart = msecdatum + 28800000;
    var msecstartpush = "" + msecstart;
    var msecend = msecdatum + 36000000;
    var msecendpush = "" + msecend;
    console.log("Step4: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Morgen');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Morgen: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Morgen/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getMittagAppointbeforeMedi(fullname, msecdatum);
  }

  $scope.getMittagAppointbeforeMedi = function(fullname, msecdatum){
    // Step 5: All Appointments between 10:00Uhr and 12:00
    var msecstart = msecdatum + 36000000;
    var msecstartpush = "" + msecstart;
    var msecend = msecdatum + 43200000;
    var msecendpush = "" + msecend;
    console.log("Step5: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Mittag');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Mittag: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Mittag/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getMittagMedi(fullname, msecdatum);
  }

  $scope.getMittagMedi = function(fullname, msecdatum){
    // Step 6: Medis am Morgen
    var msecmedidatum = msecdatum + 3600000;
    var msecstartpush = "" + msecmedidatum;

    var patientRef = firebase.database().ref(fullname + '/Medis/Mittag');
    patientRef.orderByChild("Datum").equalTo(msecstartpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Medis Mittag: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      var zeit = snap.child("Zeit").val();
      var key = snap.key;
      var path = fullname + "/Medis/Mittag/" + key;
      $scope.MeditoTable(dosis, form, name, zeit, path);
    });
    $scope.getMittagAppointafterMedi(fullname, msecdatum);
  }

  $scope.getMittagAppointafterMedi = function(fullname, msecdatum){
    // Step 7: All Appointments between 12:00Uhr and 16:00
    var msecstart = msecdatum + 43200000;
    var msecstartpush = "" + msecstart;
    var msecend = msecdatum + 57600000;
    var msecendpush = "" + msecend;
    console.log("Step7: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Mittag');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Mittag: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Mittag/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getAbendAppointbeforeMedi(fullname, msecdatum);
  }

  $scope.getAbendAppointbeforeMedi = function(fullname, msecdatum){
    // Step 8: All Appointments between 16:00Uhr and 18:00
    var msecstart = msecdatum + 57600000;
    var msecstartpush = "" + msecstart;
    var msecend = msecdatum + 64800000;
    var msecendpush = "" + msecend;
    console.log("Step8: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Abend');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Abend: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Abend/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getAbendMedi(fullname, msecdatum);
  }

  $scope.getAbendMedi = function(fullname, msecdatum){
    // Step 9: Medis am Abend
    var msecmedidatum = msecdatum + 3600000;
    var msecstartpush = "" + msecmedidatum;

    var patientRef = firebase.database().ref(fullname + '/Medis/Abend');
    patientRef.orderByChild("Datum").equalTo(msecstartpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Medis Abend: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      var zeit = snap.child("Zeit").val();
      var key = snap.key;
      var path = fullname + "/Medis/Abend/" + key;
      $scope.MeditoTable(dosis, form, name, zeit, path);
    });
    $scope.getAbendAppointafterMedi(fullname, msecdatum);
  }

  $scope.getAbendAppointafterMedi = function(fullname, msecdatum){
    // Step 10: All Appointments between 18:00Uhr and 22:00
    var msecstart = msecdatum + 64800000;
    var msecstartpush = "" + msecstart;
    var msecend = msecdatum + 79200000;
    var msecendpush = "" + msecend;
    console.log("Step10: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Abend');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Abend: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Abend/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getNachtAppointbeforeMedi(fullname, msecdatum);
  }

  $scope.getNachtAppointbeforeMedi = function(fullname, msecdatum){
    // Step 11: All Appointments between 22:00Uhr and 23:00
    var msecstart = msecdatum + 79200000;
    var msecstartpush = "" + msecstart;
    var msecend = msecdatum + 82800000;
    var msecendpush = "" + msecend;
    console.log("Step11: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Nacht');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Nacht: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Nacht/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
    $scope.getNachtMedi(fullname, msecdatum);
  }

  $scope.getNachtMedi = function(fullname, msecdatum){
    // Step 12: Medis in der Nacht
    var msecmedidatum = msecdatum + 3600000;
    var msecstartpush = "" + msecmedidatum;

    var patientRef = firebase.database().ref(fullname + '/Medis/Nacht');
    patientRef.orderByChild("Datum").equalTo(msecstartpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Medis Nacht: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var dayoutput = datumoutput.getDate();
      var monthoutput = datumoutput.getMonth() + 1;
      var yearoutput = datumoutput.getFullYear();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      var zeit = snap.child("Zeit").val();
      var key = snap.key;
      var path = fullname + "/Medis/Nacht/" + key;
      $scope.MeditoTable(dosis, form, name, zeit, path);
    });
    $scope.getNachtAppointafterMedi(fullname, msecdatum);
  }

  $scope.getNachtAppointafterMedi = function(fullname, msecdatum){
    // Step 13: All Appointments between 23:00Uhr and 23:59
    var msecstart = msecdatum + 82800000;
    var msecstartpush = "" + msecstart;
    var msecend = msecdatum + 86399999;
    var msecendpush = "" + msecend;
    console.log("Step13: " + msecstartpush, msecendpush);

    var patientRef = firebase.database().ref(fullname + '/Appoint/Nacht');
    patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
      var datum = snap.child("Datum").val();
      console.log("Appoint Nacht: " + datum);
      var nmbdatummsec = parseInt(datum);
      var datumoutput = new Date(nmbdatummsec);
      var minuteoutput = datumoutput.getMinutes();
      var houroutput = datumoutput.getHours();
      var timeoutput = houroutput + ":" + minuteoutput;
      var beschreibung = snap.child("Beschreibung").val();
      var key = snap.key;
      var path = fullname + "/Appoint/Nacht/" + key;
      $scope.AppointtoTable(beschreibung, timeoutput, path);
    });
  }


  $scope.MeditoTable = function(dosis, form, name, zeit, path) {
    // http://www.mysamplecode.com/2012/04/generate-html-table-using-javascript.html

    var table = document.getElementById("table_calendar");

    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= zeit;
    row.insertCell(1).innerHTML= name + ' ' + dosis + '' + form;
    row.insertCell(2).innerHTML= "<button class='button' ng-click='deleteRow('"+path+"')'>Delete</button>";
  }

  $scope.AppointtoTable = function(beschreibung, zeit, path) {
    var table = document.getElementById("table_calendar");

    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= zeit;
    row.insertCell(1).innerHTML= beschreibung;
    row.insertCell(2).innerHTML= "<button class='button' ng-click='deleteRow('"+path+"')'>Delete</button>";

  }

  $scope.deleteRow = function(path){
    console.log(path);
    var deleteRowRef = firebase.database().ref().child(path);
    deleteRowRef.remove();
    $scope.datechange();
    // userselection(currentPatient);
  }
  $scope.emptytheTable = function(){
    var table = document.getElementById("table_calendar");
    var rowCount = table.rows.length;
    console.log("adsf" + rowCount);
    for (i = rowCount-1; i >= 1; i--) {
      table.deleteRow(i);
      console.log("Deleted Row:" + i);
    }
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
    datumpush = datumpush + zeit.getTime() + 3600000;
    datumpush = "" + datumpush;


    var zeitcompare = zeit.getHours() + "" + zeit.getMinutes();
    // var zeitpush = zeit.getHours() + ":" + zeit.getMinutes();

    console.log(zeit.getTime());
    console.log(datumpush);
    // console.log(zeitpush);
    console.log(beschreibungpush);

    var dataforpush = {
      Datum: datumpush,
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

app.controller('VitalDataCtrl', function($scope) {

  var $configLine = {
    name: '.ct-chartBar',
    labels: 'Week',
    series: "[12, 9, 7, 8, 5, 9, 0]",
    fullWidth: "true",
    showArea: "true",
  };

  var chartLine = new ChartJS($configLine);
  chartLine.line();

})

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
