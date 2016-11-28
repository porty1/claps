var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var fireHeading = document.getElementById("fireHeading");


// Add Appointment
var AppBeschreibung = document.getElementById("AppBeschreibung");
var AppDatum = document.getElementById("AppDatum");
var AppStart = document.getElementById("AppStart");
var AppEnde = document.getElementById("AppEnde");
var submitAppointment = document.getElementById("submitAppointment")


var firebaseHeadingRef = firebase.database().ref('Medis/Medicament_01/Name');

function submitClick() {
  var firebaseRef = firebase.database().ref();
  var messageText = mainText.value;
  firebaseRef.push().set(messageText);
}

function submitAppointment() {
  var AppBeschreibungpush = AppBeschreibung.value;
  var AppDatumpush = AppDatum.value;
  var AppStartpush = AppStart.value;
  var AppEndepush = AppEnde.value;

  var dataforpush = {
    Beschreibung: AppBeschreibungpush,
    Datum: AppDatumpush,
    Start: AppStartpush,
    Ende: AppEndepush
  };

  var newAppointmentKey = firebase.database().ref().child('Dates').push().key;

  var updatedata = {};
  updatedata['/Dates/' + newAppointmentKey] = dataforpush;

  return firebase.database().ref().update(updatedata);
}


var rootRef = firebase.database().ref().child('Patient/Medis');
  rootRef.on("child_added", snap => {
      var blister = snap.child("Blister").val();
      var datum = snap.child("Datum").val();
      var dauer = snap.child("Dauer").val();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
    $("#list_body").append("<li class='item'> <b>Name: " + name + "  </b><br>Datum: " + datum + " │ Dosis: " + dosis + " │ Blister: " + blister + " │ Form: " + form + " │ Dauer: " + dauer + " Tage </li>");
  });

var detailsRef = firebase.database().ref().child("Medis");
  detailsRef.on("child_added", snap => {
      var dose = snap.child("Dose").val();
      var date = snap.child("Date").val();
      var name = snap.child("Name").val();
      var idnumber = snap.child("ID").val();
      $("#table_body").append("<tr><td> " + name + "</td><td>" + dose + "</td><td>" + date + "</tr></td>");
    });
