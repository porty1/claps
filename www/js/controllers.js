var app = angular.module('starter.controllers', ["firebase"]).
filter('plainText', function() {
  return function(text) {
    return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
}
);

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
          document.getElementById("errorpinlogin").style.display = "none"
          $timeout(function() {
            if (emailuser == null){
              document.getElementById("loader").style.display = "none";
              document.getElementById("errorpinlogin").style.display = "block";
              console.log("error" + emailuser);
              $scope.clearAllPins();
            } else {
              document.getElementById("loader").style.display = "none";
              console.log(emailuser);
              $scope.clearAllPins();
              $scope.loginUser(emailuser, passworduser);
            }
          }, 2000);
          // $scope.loginUser("schmf4@bfh.ch", "test1234");
        }, 0);
      }
    }
  }

  $scope.clearAllPins = function() {
    if($scope.passcode.length > 0) {
      $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
    }
    if($scope.passcode.length > 0) {
      $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
    }
    if($scope.passcode.length > 0) {
      $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
    }
    if($scope.passcode.length > 0) {
      $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
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
      $state.go('homescreen');
    }else{
      console.log("No User Logged In");
    }
  })

  $scope.clearWrongInput = function(){
    document.getElementById("formemail").style.border = "0px solid red"
    document.getElementById("formpassword").style.border = "0px solid red"
    document.getElementById("formpincode").style.border = "0px solid red"
    document.getElementById("formname").style.border = "0px solid red"
    document.getElementById("formvorname").style.border = "0px solid red"
    document.getElementById("errorcreatelogin").style.display = "none";
  }

  /* --- Create User --- */
  $scope.createUser = function(user) {
    $scope.clearWrongInput();

    var email = user.email;
    var password = user.password;
    var name = user.name;
    var vorname = user.vorname;
    var pincode = "";
    pincode = pincode + user.pin;

    if (email == null || email.length == 0 || password.length < 6 || pincode.length != 4 || name.length == 0 || vorname.length == 0) {
      document.getElementById("createerrormessage").innerHTML = "Bitte überprüfen Sie Ihre Angaben!";
      document.getElementById("errorcreatelogin").style.display = "block";

      if (email == null || email.length == 0) {
        document.getElementById("formemail").style.border = "1px solid red";
      }
      if (password.length < 6){
        document.getElementById("formpassword").style.border = "1px solid red";
      }
      if (pincode.length != 4){
        document.getElementById("formpincode").style.border = "1px solid red";
      }
      if (name.length == 0){
        document.getElementById("formname").style.border = "1px solid red";
      }
      if (vorname.length == 0){
        document.getElementById("formvorname").style.border = "1px solid red";
      }

    } else {
      firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code + "   " + error.message);
        // ...
      });
      console.log("Email: " + email + ", password: " + password + ", name: " + name + ", vorname: " + vorname + ", pin: " + pincode);

      // Write User Data
      firebase.database().ref(name + vorname).set({
        Name: name,
        Vorname: vorname,
        Email: email,
        PIN: pincode,
        Password: password
      });
      firebase.database().ref(name + vorname + "/Size/").set({
        Size: 0
      });
      $state.go('homescreen');
      $scope.closeRegister();
    }
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
    console.log($scope.error);
    $scope.cleanVariables();
    $scope.form = {
      name: '',
      vorname: '',
      email: '',
      password: '',
      pin: ''};
      $scope.modalRegister.show();
    };

    // Modal View schliessen
    $scope.closeRegister = function() {
      $scope.cleanVariables();
      $scope.clearWrongInput();
      $scope.modalRegister.hide();
    };
  })

app.controller('CalendarCtrl', function($scope, $state, $ionicModal, $location, $timeout) {

    var fullname = "";
    var errorhandlnmb = 0;
    var currentDatum = new Date();
    console.log(currentDatum);
    var currentDatumDay = currentDatum.getUTCDate();
    var currentDatumMonth = currentDatum.getUTCMonth() + 1;
    var currentDatumYear = currentDatum.getUTCFullYear();
    var currentDatummsec = Date.parse(currentDatumMonth + "/" + currentDatumDay + "/" + currentDatumYear);
    currentDatummsec = currentDatummsec + 3600000;
    $scope.date = {datum: new Date(currentDatummsec)};
    console.log($scope.date.datum);

    $scope.forwardoneDay = function(){
      var selectedchangeDatumforward = $scope.date.datum;
      console.log("forward"  + selectedchangeDatumforward);
      var selectedchangeDatumforwardDateParse = Date.parse(selectedchangeDatumforward);
      var thedayforward = selectedchangeDatumforwardDateParse + 86400000;
      console.log("thedayforward: " + thedayforward);
      $scope.date = {datum: new Date(thedayforward)};
      console.log("DateForward" + $scope.date.datum);
      $scope.datechange();
    }

    $scope.backoneDay = function(){
      var selectedchangeDatumbackward = $scope.date.datum;
      console.log("back" + selectedchangeDatumbackward);
      var selectedchangeDatumbackDateParse = Date.parse(selectedchangeDatumbackward);
      var thedayback = selectedchangeDatumbackDateParse - 86400000;
      console.log("thedayback: " + thedayback);
      $scope.date = {datum: new Date(thedayback)};
      console.log("DateBackward" + $scope.date.datum);
      $scope.datechange();
    }


    // Wird durch das Wechseln des Datums im tab-calendar.html aufgerufen
    $scope.datechange = function() {

      var selected = $scope.date.datum;
      var selectedDateParse = Date.parse(selected);
      console.log(selectedDateParse);
      $scope.emptytheTable();

      var loggedinuser = firebase.auth().currentUser;
      // $scope.fullname = "";

      if(loggedinuser.email == null){
        location.reload();
      } else {
        var loggedinref = firebase.database().ref();
        loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
          var nameuser = snap.child("Name").val();
          var vornameuser = snap.child("Vorname").val();
          $scope.startgetAllDates(nameuser, vornameuser, selectedDateParse);
        });
      }
    }

    $scope.startgetAllDates = function(name, vorname, msecdatum){
      // Step 0: Instanzieren
      fullname = name + vorname;
      errorhandlnmb = 0;
      msecdatum = msecdatum - 3600000;
      var msecend = msecdatum + 86399999;
      console.log("getAllDates: " + fullname, msecdatum, msecend);
      $scope.getNachtAppointbeforeMorgen(fullname, msecdatum);
    }

    $scope.getNachtAppointbeforeMorgen = function(fullname, msecdatum){
      // Step 1: All Appointments between 00:00Uhr and 04:00
      var msecstartpush = "" + msecdatum;
      var msecend = msecdatum + 14399999;
      var msecendpush = "" + msecend;
      console.log("Step1: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Nacht');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Nacht: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
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
      var msecend = msecdatum + 28799999;
      var msecendpush = "" + msecend;
      console.log("Step2: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Morgen');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Morgen: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Morgen/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Morgen");
      });
      $scope.getMorgenMedis(fullname, msecdatum);
    }

    $scope.getMorgenMedis = function(fullname, msecdatum){
      // Step 3: Medis am Morgen
      errorhandlnmb = 1;
      var msecmedidatum = msecdatum + 3600000;
      var msecstartpush = "" + msecmedidatum;
      console.log("Step 3: " + msecstartpush);

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
        $scope.MeditoTable(dosis, form, name, zeit, path, "Morgen");
        if(errorhandlnmb != 1){
          $timeout(function () {
            $scope.datechange();
          }, 50);
        }
      });
      $scope.getMorgenAppointafterMedi(fullname, msecdatum);
    }

    $scope.getMorgenAppointafterMedi = function(fullname, msecdatum){
      // Step 4: All Appointments between 8:00Uhr and 10:00Uhr
      var msecstart = msecdatum + 28800000;
      var msecstartpush = "" + msecstart;
      var msecend = msecdatum + 35999999;
      var msecendpush = "" + msecend;
      console.log("Step4: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Morgen');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Morgen: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Morgen/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Morgen");
      });
      $scope.getMittagAppointbeforeMedi(fullname, msecdatum);
    }

    $scope.getMittagAppointbeforeMedi = function(fullname, msecdatum){
      // Step 5: All Appointments between 10:00Uhr and 12:00
      var msecstart = msecdatum + 36000000;
      var msecstartpush = "" + msecstart;
      var msecend = msecdatum + 43199999;
      var msecendpush = "" + msecend;
      console.log("Step5: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Mittag');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Mittag: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput < 10){
          minuteoutput = "0" + datumoutput.getMinutes();
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Mittag/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Mittag");
      });
      $scope.getMittagMedi(fullname, msecdatum);
    }

    $scope.getMittagMedi = function(fullname, msecdatum){
      // Step 7: Medis am Mittag
      errorhandlnmb = 2;
      var msecmedidatum = msecdatum + 3600000;
      var msecstartpush = "" + msecmedidatum;

      console.log("Step 6: " + msecstartpush);

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
        $scope.MeditoTable(dosis, form, name, zeit, path, "Mittag");
        if(errorhandlnmb != 2){
          $timeout(function () {
            $scope.datechange();
          }, 50);
        }
      });
      $scope.getMittagAppointafterMedi(fullname, msecdatum);
    }

    $scope.getMittagAppointafterMedi = function(fullname, msecdatum){
      // Step 7: All Appointments between 12:00Uhr and 16:00
      var msecstart = msecdatum + 43200000;
      var msecstartpush = "" + msecstart;
      var msecend = msecdatum + 57599999;
      var msecendpush = "" + msecend;
      console.log("Step7: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Mittag');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Mittag: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Mittag/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Mittag");
      });
      $scope.getAbendAppointbeforeMedi(fullname, msecdatum);
    }

    $scope.getAbendAppointbeforeMedi = function(fullname, msecdatum){
      // Step 8: All Appointments between 16:00Uhr and 18:00
      var msecstart = msecdatum + 57600000;
      var msecstartpush = "" + msecstart;
      var msecend = msecdatum + 64799999;
      var msecendpush = "" + msecend;
      console.log("Step8: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Abend');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Abend: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Abend/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Abend");
      });
      $scope.getAbendMedi(fullname, msecdatum);
    }

    $scope.getAbendMedi = function(fullname, msecdatum){
      // Step 9: Medis am Abend
      errorhandlnmb = 3;
      var msecmedidatum = msecdatum + 3600000;
      var msecstartpush = "" + msecmedidatum;

      console.log("Step 9: " + msecstartpush);

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
        $scope.MeditoTable(dosis, form, name, zeit, path, "Abend");
        if(errorhandlnmb != 3){
          $timeout(function () {
            $scope.datechange();
          }, 50);
        }
      });
      $scope.getAbendAppointafterMedi(fullname, msecdatum);
    }

    $scope.getAbendAppointafterMedi = function(fullname, msecdatum){
      // Step 10: All Appointments between 18:00Uhr and 22:00
      var msecstart = msecdatum + 64800000;
      var msecstartpush = "" + msecstart;
      var msecend = msecdatum + 79199999;
      var msecendpush = "" + msecend;
      console.log("Step10: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Abend');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Abend: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Abend/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Abend");
      });
      $scope.getNachtAppointbeforeMedi(fullname, msecdatum);
    }

    $scope.getNachtAppointbeforeMedi = function(fullname, msecdatum){
      // Step 11: All Appointments between 22:00Uhr and 23:00
      var msecstart = msecdatum + 79200000;
      var msecstartpush = "" + msecstart;
      var msecend = msecdatum + 82799999;
      var msecendpush = "" + msecend;
      console.log("Step11: " + msecstartpush, msecendpush);

      var patientRef = firebase.database().ref(fullname + '/Appoint/Nacht');
      patientRef.orderByChild("Datum").startAt(msecstartpush).endAt(msecendpush).on("child_added", snap => {
        var datum = snap.child("Datum").val();
        console.log("Appoint Nacht: " + datum);
        var nmbdatummsec = parseInt(datum);
        var datumoutput = new Date(nmbdatummsec);
        var minuteoutput = datumoutput.getMinutes();
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Nacht/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Nacht");
      });
      $scope.getNachtMedi(fullname, msecdatum);
    }

    $scope.getNachtMedi = function(fullname, msecdatum){
      // Step 12: Medis in der Nacht
      errorhandlnmb = 4;
      var msecmedidatum = msecdatum + 3600000;
      var msecstartpush = "" + msecmedidatum;

      console.log("Step 12: " + msecstartpush);

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
        $scope.MeditoTable(dosis, form, name, zeit, path, "Nacht");
        if(errorhandlnmb != 4){
          $timeout(function () {
            $scope.datechange();
          }, 50);
        }
      });
      $scope.getNachtAppointafterMedi(fullname, msecdatum);
    }

    $scope.getNachtAppointafterMedi = function(fullname, msecdatum){
      // Step 13: All Appointments between 23:00Uhr and 23:59
      errorhandlnmb = 0;
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
        if(minuteoutput == 0){
          minuteoutput = "00";
        }
        var houroutput = datumoutput.getHours();
        if (houroutput < 10){
          houroutput = "0" + datumoutput.getHours();
        }
        var timeoutput = houroutput + ":" + minuteoutput;
        var beschreibung = snap.child("Beschreibung").val();
        var key = snap.key;
        var path = fullname + "/Appoint/Nacht/" + key;
        $scope.AppointtoTable(beschreibung, timeoutput, path, "Nacht");
      });
    }


    // Liest den Pfad aus dem Button - Element und gibt in an $scope.deleteRow weiter. Aus Referenzgründen darf es keine $scope Funktion sein
    convertToDeleteRow = function(path){
      $scope.deleteRow(path);
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

    $scope.MeditoTable = function(dosis, form, name, zeit, path, tageszeit) {
      // Quelle: http://www.mysamplecode.com/2012/04/generate-html-table-using-javascript.html
      if (tageszeit == "Nacht"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "nachttime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= name + ' ' + dosis + '' + form;
        row.insertCell(2).innerHTML= ""; //<button class='button' ng-click='deleteRow('"+path+"')'>Delete</button>;
      }
      else if (tageszeit == "Abend"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "abendtime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= name + ' ' + dosis + '' + form;
        row.insertCell(2).innerHTML= ""; //<button class='button' ng-click='deleteRow('"+path+"')'>Delete</button>;
      }
      else if (tageszeit == "Mittag"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "mittagtime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= name + ' ' + dosis + '' + form;
        row.insertCell(2).innerHTML= ""; //<button class='button' ng-click='deleteRow('"+path+"')'>Delete</button>;
      }
      else if (tageszeit == "Morgen"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "morgentime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= name + ' ' + dosis + '' + form;
        row.insertCell(2).innerHTML= ""; //<button class='button' ng-click='deleteRow('"+path+"')'>Delete</button>;
      }
    }

    $scope.AppointtoTable = function(beschreibung, zeit, path, tageszeit) {

      if (tageszeit == "Nacht"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "nachttime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= beschreibung;
        row.insertCell(2).innerHTML= "<img src=img/delete.png height=20 width=20 onclick=convertToDeleteRow('"+path+"')></img>";
      }
      else if (tageszeit == "Abend"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "abendtime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= beschreibung;
        row.insertCell(2).innerHTML= "<img src=img/delete.png height=20 width=20 onclick=convertToDeleteRow('"+path+"')></img>";
      }
      else if (tageszeit == "Morgen"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "morgentime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= beschreibung;
        row.insertCell(2).innerHTML= "<img src=img/delete.png height=20 width=20 onclick=convertToDeleteRow('"+path+"')></img>";
      }

      else if (tageszeit == "Mittag"){
        var table = document.getElementById("table_calendar");
        var rowCount = table.rows.length;
        console.log(rowCount);
        var row = table.insertRow(rowCount);
        row.setAttribute('id', "mittagtime")
        row.insertCell(0).innerHTML= "<b>" + zeit + "</b>";
        row.insertCell(1).innerHTML= beschreibung;
        row.insertCell(2).innerHTML= "<img src=img/delete.png height=20 width=20 onclick=convertToDeleteRow('"+path+"')></img>";
      }
    }

    /*
    $('td').each(
    function(){
    $(this).text(Math.floor(Math.random() * (max - min + 1)) + min);
  });

  */

  /*--- Popup Add Appointment ---*/
  $ionicModal.fromTemplateUrl('templates/addappointment.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addappointmentmodal = modal;
  });

  // Modal View öffnen
  $scope.openAddAppointment = function() {
    console.log("openapo");
    $scope.appointForm = {time: "", datum: "", area: ""};
    $scope.addappointmentmodal.show();
  };

  // Modal View schliessen
  $scope.closeAddAppointment = function() {
    console.log("closeapp");
    $scope.clearWrongInput();
    $scope.addappointmentmodal.hide();
  };

  $scope.clearWrongInput = function(){
    document.getElementById("changeDatumAddAppoint").style.border = "0px solid red"
    document.getElementById("changeTimeAddAppoint").style.border = "0px solid red"
    document.getElementById("beschreibungAddAppoint").style.border = "1px solid grey"
    document.getElementById("errorcreateappoint").style.display = "none";
  }

  $scope.createAppointment = function(appointvalue) {

    var datum = new Date(appointvalue.datum);
    var zeit = new Date(appointvalue.time);
    console.log(datum + " " + zeit);
    var beschreibungpush = appointvalue.area;

    // Errorhandling Appointmentinput
    var timestampdatum = Date.parse(datum);
    var timestampzeit = Date.parse(zeit);

    if (isNaN(timestampdatum) == true || isNaN(timestampzeit) == true || beschreibungpush.length == 0){
      document.getElementById("appointerrormessage").innerHTML = "Bitte überprüfen Sie Ihre Angaben!";
      document.getElementById("errorcreateappoint").style.display = "block";

      if (isNaN(timestampdatum) == true) {
        document.getElementById("changeDatumAddAppoint").style.border = "1px solid red";
      }
      if (isNaN(timestampzeit) == true){
        document.getElementById("changeTimeAddAppoint").style.border = "1px solid red";
      }
      if (beschreibungpush.length == 0){
        document.getElementById("beschreibungAddAppoint").style.border = "1px solid red";
      }
    } else {
      var loggedinuser = firebase.auth().currentUser;
      var loggedinref = firebase.database().ref();
      loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
        var nameuser = snap.child("Name").val();
        var vornameuser = snap.child("Vorname").val();
        $scope.setAppoint(nameuser, vornameuser, datum, zeit, beschreibungpush);
      });
      $scope.clearWrongInput();
      $scope.addappointmentmodal.hide();
    }
  }

  $scope.setAppoint = function(nameuser, vornameuser, datum, zeit, beschreibungpush){

    var currentPatient = nameuser + vornameuser;
    var datumpush = datum.getTime();
    datumpush = datumpush + zeit.getTime() + 3600000;
    datumpush = "" + datumpush;

    if(zeit.getUTCMinutes() == 0){
      var zeitcompare = zeit.getUTCHours() + "00";
    } else {
      var zeitcompare = zeit.getUTCHours() + "" + zeit.getUTCMinutes();
    }

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
      $scope.datechange();
    }
    else if (zeitcompare >= 1000 && zeitcompare < 1600){
      var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + 'Appoint/').push().key;
      var mittagupdatedata = {};
      mittagupdatedata[currentPatient + '/Appoint/Mittag/' + mittagnewAppointmentKey] = dataforpush;
      addMittag(mittagupdatedata);
      console.log("mittag");
      $scope.datechange();
    }
    else if (zeitcompare >= 1600 && zeitcompare < 2200){
      var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + 'Appoint/').push().key;
      var abendupdatedata = {};
      abendupdatedata[currentPatient + '/Appoint/Abend/' + abendnewAppointmentKey] = dataforpush;
      addAbend(abendupdatedata);
      console.log("abend");
      $scope.datechange();
    }
    else if (zeitcompare >= 2200 || zeitcompare < 0400) {
      var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + 'Appoint/').push().key;
      var nachtupdatedata = {};
      nachtupdatedata[currentPatient + '/Appoint/Nacht/' + nachtnewAppointmentKey] = dataforpush;
      addNacht(nachtupdatedata);
      console.log("nacht");
      $scope.datechange();
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

  $scope.goBackHome = function(){
    $state.go('homescreen');
  }

  $scope.setPageStyle = function(){
    $timeout(function () {
      var loggedinuser = firebase.auth().currentUser;
      var setpagesize;

      if(loggedinuser.email == null){
        location.reload();
      } else {
        var loggedinref = firebase.database().ref();
        loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
          setpagesize = snap.child("Size/Size").val();
          console.log("setPageStyle: " + setpagesize);
          console.log("Vor if: " + setpagesize);
          if (setpagesize == 0){
            // Alle Styles im Standardview
            console.log("Set to 15px View");
            document.getElementById("goBackHomeLink").style.fontSize = "15px";
            document.getElementById("OpenAddAppointLink").style.fontSize = "15px";
            document.getElementById("table_calendar").style.fontSize = "15px";
            document.getElementById("changeDatum").style.fontSize = "15px";
          } else if (setpagesize == 1) {
            // Alle Styles in der Grossansicht
            console.log("Set to 20px View");
            document.getElementById("goBackHomeLink").style.fontSize = "20px";
            document.getElementById("OpenAddAppointLink").style.fontSize = "20px";
            document.getElementById("table_calendar").style.fontSize = "20px";
            document.getElementById("changeDatum").style.fontSize = "20px";
          }
        });
      }
    }, 50);
  }

  $scope.datechange();
  $scope.setPageStyle();
})

app.controller('VitalDataCtrl', function($scope, $state, $timeout, $ionicPopup) {
  // Globale Controllervariablen setzen
  var loggedinuser = firebase.auth().currentUser;
  var loggedinref = firebase.database().ref();

  // Draws the chart with the values from the database
  $scope.drawChart = function(vitalDates, data) {
    var dates = new Array();
    // var vals = new Array();
    //result = result.reverse();
    // var dates = vitalDates;

    // if (result.length > 5) {
    //   result = result.slice(Math.max(result.length - 5, 1));
    // }

    for (var i = 0; i < vitalDates.length; i++){
      var d = new Date(vitalDates[i]);
      var currentMinutes = d.getMinutes();
      if (currentMinutes.toString().length == 1) {
        currentMinutes = "0" + currentMinutes;
      }
      dates.push(d.getDate() + "." + d.getMonth() + "." + d.getFullYear() + " - " + d.getHours() + ":" + currentMinutes + " Uhr");
    }

    var $configBar = {
      name: '.ct-chartBar',
      labels: 'Custom',
      series: data
    };
    var chartBar = new ChartJS($configBar, dates);
    chartBar.bar(data);
  }

  // Lädt alle Daten zum Gewicht aus der Datenbank
  $scope.loadWeight = function(fullname){
    console.log("LoadWeight: " + loggedinuser.email);
    // var loggedinuser = firebase.auth().currentUser;
    var patientRefVital = firebase.database().ref(fullname + '/Vital/Gewicht/').limitToLast(5);
    console.log(fullname);
    var vitalDates = [];
    var vitalWeights = [];
    var data = [];

    patientRefVital.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        data.push(childData);
      });
    });

    // Iteriert über die Daten as der Datenbank und füllt die entsprechenden Arrays ab
    for (var j = 0; j < data.length; j++){
      vitalDates.push(data[j].Date);
      vitalWeights.push(data[j].Weight);
    }
    //TODO
    $scope.drawChart(vitalDates, vitalWeights);
  }

  // Generiert die Tabelle für die Blutdruckdaten
  $scope.bloodPressureToTable = function(value1, value2, value3) {
    var table = document.getElementById("table_bp");

    var rowCount = table.rows.length;
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML= "<div style='text-align:center; font-size:14px'>"+value1+"</div>";
    row.insertCell(1).innerHTML= "<div style='text-align:center; font-size:14px'>"+value2+"</div>";
    row.insertCell(2).innerHTML= "<div style='text-align:center; font-size:14px'>"+value3+"</div>";
  }

  // Lädt alle Daten vom Blutdruck aus der Datenbank
  $scope.loadbp = function(fullname){
    var loggedinuser = firebase.auth().currentUser;
    var patientRefVital = firebase.database().ref(fullname + '/Vital/Blutdruck');
    var vitalDatesBP = [];
    var bpSystol = [];
    var bpDiastol = [];
    var data = [];

    patientRefVital.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        data.push(childData);
      });
    });

    // Iteriert über die Daten as der Datenbank und füllt die entsprechenden Arrays ab
    for (var j = 0; j < data.length; j++){
      vitalDatesBP.push(data[j].Date);
      bpSystol.push(data[j].Systol);
      bpDiastol.push(data[j].Diastol);
    }

    //$scope.bloodPressureToTable(datum, systolisch, diastolisch);

    for(var i = 0; i < vitalDatesBP.length; i++){
      $scope.bloodPressureToTable(vitalDatesBP[i], bpSystol[i], bpDiastol[i]);
    }
  }

  $scope.saveWeight = function(){
    var weight = document.getElementById('weightValue').value;

    if (weight == "") {
      $scope.noValPop();
    } else if (isNaN(weight)) {
      $scope.notNumericPop();
    }else{
      var date = new Date();
      var postData = {
        Date: date,
        Weight: weight
      };

      loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
        var nameuser = snap.child("Name").val();
        var vornameuser = snap.child("Vorname").val();
        $scope.saveValWeight(nameuser, vornameuser, postData);
      });

      document.getElementById('weightValue').value = "";
    }
  }

  // Blutdruck speichern
  $scope.saveBloodPressure = function(){
    var systol = document.getElementById('bloodPressureValueSys').value;
    var diastol = document.getElementById('bloodPressureValueDis').value;

    if (systol == "" || diastol == "") {
      $scope.noValPop();
    } else if (isNaN(systol) || isNaN(diastol)) {
      $scope.notNumericPop();
    }else{
      var date = new Date();

      var postData = {
        Date: date,
        Systol: systol,
        Diastol: diastol
      };

      // var loggedinuser = firebase.auth().currentUser;
      // var loggedinref = firebase.database().ref();

      loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
        var nameuser = snap.child("Name").val();
        var vornameuser = snap.child("Vorname").val();
        $scope.saveValBP(nameuser, vornameuser, postData);
      });

      document.getElementById('bloodPressureValueSys').value = "";
      document.getElementById('bloodPressureValueDis').value = "";
    }
  }

  // Gewicht wird in der Datenbank gespeichert
  $scope.saveValWeight = function(nameuser, vornameuser, postData){
    var fullname = nameuser + vornameuser;
    var newPostKey = firebase.database().ref().child(fullname).push().key;
    var path = fullname + "/Vital/Gewicht/";
    var updates = {};
    updates[path + newPostKey] = postData;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
  }

  // Blutdruck wird in der Datenbank gespeichert
  $scope.saveValBP = function(nameuser, vornameuser, postData){
    var fullname = nameuser + vornameuser;
    var newPostKey = firebase.database().ref().child(fullname).push().key;
    var path = fullname + "/Vital/Blutdruck/";
    var updates = {};
    updates[path + newPostKey] = postData;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
  }

  // PopUp wird angezeigt, falls ein nicht nummerischer Wert angegeben wird
  $scope.notNumericPop = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Ungültiger Wert!',
      template: 'Das Gewicht bitte in einer ganzen Zahl angeben! Beispiel: 70'
    });
  }

  // PopUp wird angezeigt, falls kein Wert eingetragen wurde
  $scope.noValPop = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Es wurde kein Wert eingetragen!',
      template: 'Bitte einen Wert eingeben!'
    });
  }

  $scope.goBackHome = function(){
    $state.go('homescreen');
  }

  $scope.goBackVital = function(){
    $state.go('tab.vitaldata');
  }

  $scope.setPageStyle = function(){
    $timeout(function () {
      var setpagesize;
      var loggedinuser = firebase.auth().currentUser;
      if(loggedinuser.email == null){
        location.reload();
      } else {
        loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
          var nameuser = snap.child("Name").val();
          var vornameuser = snap.child("Vorname").val();
          setpagesize = snap.child("Size/Size").val();
          console.log("setPageStyle: " + setpagesize);
          if (setpagesize == 0){
            // Alle Styles im Standardview
            console.log("Set to 15px View");
            document.getElementById("goBackHomeLink").style.fontSize = "15px";
            document.getElementById("VitalListGewicht").style.fontSize = "15px";
            document.getElementById("VitalListBlutdruck").style.fontSize = "15px";
          } else if (setpagesize == 1) {
            // Alle Styles in der Grossansicht
            console.log("Set to 20px View");
            document.getElementById("goBackHomeLink").style.fontSize = "20px";
            document.getElementById("VitalListGewicht").style.fontSize = "20px";
            document.getElementById("VitalListBlutdruck").style.fontSize = "20px";
          }
        });
      }
    }, 50);
  }

  // Methodenaufruf für den PageStyle
  $scope.setPageStyle();

  $scope.initPage = function (){
    loggedinuser = firebase.auth().currentUser;
    var fullname;
    loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
      var nameuser = snap.child("Name").val();
      var vornameuser = snap.child("Vorname").val();
      fullname = nameuser + vornameuser;
    });
    return fullname;
  }

  $scope.initPageWeight = function(){
    var fullname = $scope.initPage();

    $scope.loadWeight(fullname);
  }

  $scope.initPageBP = function(){
    var fullname = $scope.initPage();
    $scope.loadbp(fullname);
  }


})

app.controller('MenueplanCtrl', function($scope, $state, $timeout) {

  $scope.getMenueplan = function(){
    var storageRef = firebase.storage().ref();
    storageRef.child('menueplan.png').getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
      // Or inserted into an <img> element:
      var img = document.getElementById('myimg');
      img.src = url;
    }).catch(function(error) {
      // Handle any errors
    });
  }

  $scope.goBackHome = function(){
    $state.go('homescreen');
  }

  $scope.setPageStyle = function(){
    $timeout(function () {
      var loggedinuser = firebase.auth().currentUser;
      var setpagesize;

      if(loggedinuser.email == null){
        location.reload();
      } else {
        var loggedinref = firebase.database().ref();
        loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
          setpagesize = snap.child("Size/Size").val();
          // var name = snap.child("Name").val();
          // var vorname = snap.child("Vorname").val();
          console.log("setPageStyle: " + setpagesize);
          if (setpagesize == 0){
            // Alle Styles im Standardview
            console.log("Set to 15px View");
            document.getElementById("goBackHomeLink").style.fontSize = "15px";
            document.getElementById("headerMenuePlan").style.fontSize = "15px";
          } else if (setpagesize == 1) {
            // Alle Styles in der Grossansicht
            console.log("Set to 20px View");
            document.getElementById("goBackHomeLink").style.fontSize = "20px";
            document.getElementById("headerMenuePlan").style.fontSize = "20px";
          }
        });
      }
    }, 10);
  }
  $scope.setPageStyle();
  $scope.getMenueplan();
})

app.controller('HomescreenCtrl', function($scope, $state, $timeout) {

  gotoCalendar = function() {
    $scope.goCalendar();
  }
  gotoVitalData = function(){
    $scope.goVitalData();
  }
  gotoMenue = function(){
    $scope.goMenue();
  }
  gotoSettings = function(){
    $scope.goSettings();
  }

  $scope.goCalendar = function(){
    $state.go('tab.calendar');
  }
  $scope.goVitalData = function(){
    $state.go('tab.vitaldata');
  }
  $scope.goMenue = function(){
    $state.go('tab.menueplan');
  }
  $scope.goSettings = function(){
    $state.go('tab.settings');
  }

  $scope.setPageStyle = function(){
    $timeout(function () {
      var loggedinuser = firebase.auth().currentUser;
      var setpagesize;

      if(loggedinuser.email == null){
        location.reload();
      } else {
        var loggedinref = firebase.database().ref();
        loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
          setpagesize = snap.child("Size/Size").val();
          var name = snap.child("Name").val();
          var vorname = snap.child("Vorname").val();
          homename.innerHTML = "Willkommen <br><br>" + vorname + " " + name;
          console.log("setPageStyle: " + setpagesize);
          if (setpagesize == 0){
            // Alle Styles im Standardview
            console.log("Set to 15px View");
            document.getElementById("homename").style.fontSize = "30px";
            document.getElementById("homescreenTable").style.fontSize = "15px";
            document.getElementById("imgCalendar").style.width = "140px";
            document.getElementById("imgCalendar").style.height = "140px";
            document.getElementById("imgVitaldata").style.width = "140px";
            document.getElementById("imgVitaldata").style.height = "140px";
            document.getElementById("imgMenue").style.width = "140px";
            document.getElementById("imgMenue").style.height = "140px";
            document.getElementById("imgSettings").style.width = "140px";
            document.getElementById("imgSettings").style.height = "140px";
          } else if (setpagesize == 1) {
            // Alle Styles in der Grossansicht
            console.log("Set to 20px View");
            document.getElementById("homename").style.fontSize = "40px";
            document.getElementById("homescreenTable").style.fontSize = "20px";
            document.getElementById("imgCalendar").style.width = "180px";
            document.getElementById("imgCalendar").style.height = "180px";
            document.getElementById("imgVitaldata").style.width = "180px";
            document.getElementById("imgVitaldata").style.height = "180px";
            document.getElementById("imgMenue").style.width = "180px";
            document.getElementById("imgMenue").style.height = "180px";
            document.getElementById("imgSettings").style.width = "180px";
            document.getElementById("imgSettings").style.height = "180px";
          }
        });
      }
    }, 50);
  }
  $scope.setPageStyle();
})

app.controller('addappointmentCtrl', function($scope, $timeout) {})

app.controller('SettingsCtrl', function($scope, I4MIMidataService, $timeout, $state) {
  // Values for MidataLogin
  I4MIMidataService.logout();
  $scope.login = {};
  $scope.login.email = '';
  $scope.login.password = '';
  $scope.login.server = 'https://test.midata.coop:9000';

  var fullname = "";
  var loggedinuser = firebase.auth().currentUser;
  console.log(loggedinuser);

  $scope.checkforAccountInfo = function(){
    console.log("checking...");
    var loggedinref = firebase.database().ref();
    loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
      var nameuser = snap.child("Name").val();
      var vornameuser = snap.child("Vorname").val();
      $scope.getAccountinfo(nameuser, vornameuser);
    });
  }

  $scope.getAccountinfo = function(name, vorname){
    fullname = name + vorname;

    var patientRef = firebase.database().ref(fullname);
    patientRef.once('value').then(function(snapshot) {
      var email = snapshot.child("Email").val();
      var vorname = snapshot.child("Vorname").val();
      var name = snapshot.child("Name").val();
      $scope.AccounttoTable(1, email);
      $scope.AccounttoTable(2, vorname);
      $scope.AccounttoTable(3, name);
    });
    var selectedsize;
    var patientSizeRef = firebase.database().ref(fullname + "/Size/");
    patientSizeRef.on("value", snap => {
      selectedsize = snap.child("Size").val();
    });
    document.getElementById("sizeselector").selectedIndex = selectedsize;
    console.log("SelectedSize: " + selectedsize);
  }
  $scope.AccounttoTable = function(index, value) {
    var table = document.getElementById("table_settings");

    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);

    if (index == 1) {
      row.insertCell(0).innerHTML= "<div style='text-align:left' id='listLeftItem'>Email </div>";
      row.insertCell(1).innerHTML= "<div style='text-align:right' id='listRightItem'>"+value+"</div>";
    } else if (index == 2) {
      row.insertCell(0).innerHTML= "<div style='text-align:left' id='listLeftItem'>Vorname </div>";
      row.insertCell(1).innerHTML= "<div style='text-align:right' id='listRightItem'>"+value+"</div>";
    } else {
      row.insertCell(0).innerHTML= "<div style='text-align:left' id='listLeftItem'>Nachname </div>";
      row.insertCell(1).innerHTML= "<div style='text-align:right' id='listRightItem'>"+value+"</div>";
    }
  }

  $scope.deletetableRow = function(){
    var table = document.getElementById("table_settings");
    if (table.rows.length == 2){
      table.deleteRow(2);
      table.deleteRow(1);
      table.deleteRow(0);
    }
  }
  // Logout
  $scope.logout = function() {
    console.info("Logout");
    $scope.deletetableRow();
    firebase.auth().signOut().then(function(){
      console.log("Logout Successful");
    }, function(error){
      console.log("error");
    })
    $state.go('login');
    location.reload();
  }

  $scope.checkforAccountInfo()
  setStyle = function(){
    $scope.setStyle();
  }

  $scope.setStyle = function() {
    var selectedstyle = document.getElementById("sizeselector").selectedIndex;
    var postStyle = {
      Size: selectedstyle
    };
    var updateStyle = {};
    updateStyle['/' + fullname + "/Size/"] = postStyle;

    console.log("StyleChanged to " + selectedstyle);
    $scope.returnUpdateStyle(updateStyle);
    alert("Die Anzeige Einstellungen wurden geändert. Bitte Loggen Sie sich neu ein");
  }

  $scope.returnUpdateStyle = function(updateStyle){
    return firebase.database().ref().update(updateStyle);
  }

  $scope.goBackHome = function(){
    $state.go('homescreen');
  }

  $scope.setPageStyle = function(){
    $timeout(function () {
      var loggedinuser = firebase.auth().currentUser;
      var setpagesize;

      if(loggedinuser.email == null){
        location.reload();
      } else {
        var loggedinref = firebase.database().ref();
        loggedinref.orderByChild("Email").equalTo(loggedinuser.email).on("child_added", snap => {
          setpagesize = snap.child("Size/Size").val();
          console.log("setPageStyle: " + setpagesize);
          if (setpagesize == 0){
            // Alle Styles im Standardview
            console.log("Set to 15px View");
            document.getElementById("goBackHomeLink").style.fontSize = "15px";
            document.getElementById("listHeaderAnzeige").style.fontSize = "15px";
            document.getElementById("listHeaderAccount").style.fontSize = "15px";
            document.getElementById("table_settings").style.fontSize = "15px";
            document.getElementById("listItem").style.fontSize = "15px";
            document.getElementById("sizeselector").selectedIndex = 0;
            document.getElementById("sizeselector").style.fontSize = "15px";
          } else if (setpagesize == 1) {
            // Alle Styles in der Grossansicht
            console.log("Set to 20px View");
            document.getElementById("goBackHomeLink").style.fontSize = "20px";
            document.getElementById("listHeaderAnzeige").style.fontSize = "20px";
            document.getElementById("listHeaderAccount").style.fontSize = "20px";
            document.getElementById("table_settings").style.fontSize = "20px";
            document.getElementById("listItem").style.fontSize = "20px";
            document.getElementById("sizeselector").selectedIndex = 1;
            document.getElementById("sizeselector").style.fontSize = "20px";
          }
        });
      }
    }, 50);
  }
  $scope.setPageStyle();

  // ---------------------------------------
  //Midata Login
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
      //$state.go('tab.calendar');
      console.info($scope.login.logOut)
    } else {
      I4MIMidataService.logout();
    }
  }
})
