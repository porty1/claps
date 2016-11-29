var submitBtn = document.getElementById("submitBtn");

// Add Appointment
var MediBlister = document.getElementById("elementBlister");
var MediDatum = document.getElementById("elementDatum");
var MediDauer = document.getElementById("elementDauer");
var MediDosis = document.getElementById("elementDosis");
var MediForm = document.getElementById("elementForm");
var MediName = document.getElementById("elementName");


function submitClick() {
  var MediBlisterPush = MediBlister.value;
  var MediDatumPush = MediDatum.value;
  var MediDauerPush = MediDauer.value;
  var MediDosisPush = MediDosis.value;
  var MediFormPush = MediForm.value;
  var MediNamePush = MediName.value;

  var dataforpush = {
    Blister: MediBlisterPush,
    Datum: MediDatumPush,
    Dauer: MediDauerPush,
    Dosis: MediDosisPush,
    Form: MediFormPush,
    Name: MediNamePush
  };

  var newAppointmentKey = firebase.database().ref().child('Patient/Medis').push().key;

  var updatedata = {};
  updatedata['/Patient/Medis/Morgen/' + newAppointmentKey] = dataforpush;

  return firebase.database().ref().update(updatedata);
}


var detailsRef = firebase.database().ref().child('Patient/Medis/Morgen');
  detailsRef.on("child_added", snap => {
      var blister = snap.child("Blister").val();
      var datum = snap.child("Datum").val();
      var dauer = snap.child("Dauer").val();
      var dosis = snap.child("Dosis").val();
      var form = snap.child("Form").val();
      var name = snap.child("Name").val();
      $("#Mediview").append("<tr><td> " + datum + "</td><td>" + name + "</td><td>" + dosis + "</td><td>" + form +"</td><td>" + blister + "</td><td>" + dauer + " Tage </td></tr>");
    });
